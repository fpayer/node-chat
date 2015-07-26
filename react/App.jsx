(function(window) {
  var stream = new DuplexEvent();
  localStorage.room = localStorage.room || 'All';

  window.api = (function() {
    var name;

    return {
      setBotName : function(newName) {
        name = newName;
      },
      setKey : function(key) {
        $.ajaxSetup({
          headers : {
            'X-Mashape-Key' : key
          }
        });
      },
      sendMessage : function(message) {
        socket.emit('message', {
          time : (new Date()).toLocaleTimeString(),
          name : name ? name : (localStorage.name + '\'s Bot'),
          text : message,
          bot : true
        });
      }
    }
  })();

  var App = React.createClass({
    getInitialState : function() {
      return {
        name : localStorage.name,
        room : localStorage.room
      }
    },
    loadSettings : function() {
      this.setState({
        name : localStorage.name,
        room : localStorage.room
      });
      $(React.findDOMNode(this.refs.name)).val(localStorage.name);
      $(React.findDOMNode(this.refs.room)).val(localStorage.room);
      socket.emit('join', localStorage.room);
      socket.emit('name', localStorage.name);
    },
    setName : function(e) {
      var text = $(React.findDOMNode(this.refs.name)).val();
      if (e.keyCode) {
        if (e.keyCode === 13 && text.trim() !== '') {
          localStorage.name = text;
          this.loadSettings();
          $('.modal').modal('hide');
        }
      } else {
        localStorage.name = text;
        this.loadSettings();
        $('.modal').modal('hide');
      }
    },
    componentDidMount : function() {
      var _this = this;
      if (!this.state.name) {
        $('.modal').modal({
          closable : false,
          onShow : function() {
            $('.modal input').focus();
          }
        }).modal('show');
      } 
      stream.on('name', function(e, name) {
        localStorage.name = name;
        _this.loadSettings();
      });
      stream.on('room', function(e, room) {
        localStorage.room = room;
        _this.loadSettings();
      });
      this.loadSettings();
    },
    render : function() {
      return <div style={{height:'100%'}}>
        <div style={{height:'100%'}} id='main'>
          <Component.ChatBox name={this.state.name} room={this.state.room} stream={stream} />
          <Component.Sidebar name={this.state.name} room={this.state.room} stream={stream} />
          <div className='ui small modal'>
            <div className='header'>What is your name?</div>
            <div className='content'>
              <div className='ui fluid action input'>
                <input type='text' placeholder='Enter your name' ref='name' onKeyUp={this.setName}/>
                <button className='ui blue right labeled button' onClick={this.setName}>Enter</button>
              </div>
            </div>
          </div>
        </div>
        <Component.Editor name={this.state.name} />
      </div>
    }
  });
  window.Component.App = App;
})(window);
