(function(window) {
  var Sidebar = React.createClass({
    componentDidMount : function() {
      var _this = this;

      socket.on('users', function(users) {
        _this.setState({
          users : users
        });
      });

      this.props.stream.on('setName', function(e, name) {
        $(React.findDOMNode(_this.refs.name)).val(name);
      });
    },
    getInitialState : function() {
      return {
        users : [ ]
      }
    },
    setName : function() {
      var name = $(React.findDOMNode(this.refs.name)).val()
      if (name !== this.props.name) {
        this.props.stream.emit('name', name);
        notify('Username updated', null, null);
      }
    },
    setRoom : function() {
      var room = $(React.findDOMNode(this.refs.room)).val();
      if (room !== this.props.room) {
        this.props.stream.emit('room', room);
        notify('Switched rooms', null, null);
      }
    },
    openEditor : function() {
      $('#main').swapPage($('#editor'));
    },
    render : function() {
      return <div id='sidebar'>
        <table id='info' className='ui celled striped table right'>
          <thead>
            <tr>
              <th>Settings</th>
            </tr>
            <tr>
              <td>
                <div className='ui form' ref='infoForm'>
                  <div className='two fields'>
                    <div className='field'>
                      <label>Username</label>
                      <input type='text' name='name' ref='name' defaultValue={this.props.name} onBlur={this.setName} />
                    </div> 
                    <div className='field'> 
                      <label>Chatroom</label>
                      <input type='text' name='room' ref='room' defaultValue={this.props.room} onBlur={this.setRoom} />
                    </div>
                  </div>
                  <div className='field'>
                    <div className='ui fluid blue button' onClick={this.openEditor}>Configure Bot</div>
                  </div>
                </div>
              </td>
            </tr>
          </thead>
        </table>
        <table className="ui celled striped table right">
          <thead>
            <tr>
              <th>{'Online Users [' + this.props.room + ']'}</th>
            </tr>
          </thead>
          <tbody>
            { this.state.users.map(function(user) {
              return <tr key={user}>
                <td>{user}</td>
              </tr>
            }) }
          </tbody>
        </table>
      </div>
    }
  });
  window.Component.Sidebar = Sidebar;
})(window);
