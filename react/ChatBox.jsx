(function(window) {
  var ChatBox = React.createClass({
    addMessage : function(payload) {
      this.state.messages.push(payload);
      this.setState({
        messages : this.state.messages
      });
      $("#chatter").animate({ scrollTop: $('#chatter').prop('scrollHeight')}, 50);
    },
    componentDidMount : function() {
      var _this = this;

      socket.on('message', function(data) {
        _this.addMessage(data);
        if (!data.bot) {
          try {
            (function() {
              eval(localStorage.code)(data.time, data.name, data.text);
            })();
          } catch(e) {

          }
        }
      });
    },
    getInitialState : function() {
      return {
        messages : [ ]
      }
    },
    sendMessage : function(e) {
      var _this = this;
      var text = $(React.findDOMNode(this.refs.message)).val();

      var exec = function() {
        socket.emit('message', {
          time : (new Date()).toLocaleTimeString(),
          name : _this.props.name,
          text : text  
        });
        $(React.findDOMNode(_this.refs.message)).val('');
      }

      if (e.keyCode) {
        if (e.keyCode === 13 && text.trim() !== '') {
          exec();
        }
      } else {
        exec();
      }
    },
    render : function() {
      return <div style={_={height:'100%',width:'calc(100% - 440px)'}}>
        <div id='chatter' className='chatter'>
          <table id="chat" className="ui celled striped table left">
            <thead> 
              <tr>
                <th>NodeJS Chat App</th>
              </tr>
            </thead>
            <tbody id='messages'>
              { this.state.messages.map(function(item, index) {
                return <tr key={index}>
                  <td>
                    <span>{'[' + item.time + '] ' + item.name + ' - ' + item.text}</span>
                    <img src={item.image} className='ui small image' style={{display:item.image ? '' : 'none'}} />
                  </td>
                </tr>
              }) }
            </tbody>
          </table>    
        </div>
        <div id="message-box" className='message-box'>
          <div className="ui fluid action input">
            <input ref='message' id="message-input" type="text" placeholder="Enter message here" autoComplete="off" onKeyUp={this.sendMessage} />
            <button id="message-btn" className="ui blue right labeled button" onClick={this.sendMessage}>Send</button>
          </div>
        </div>
      </div>
    }
  });
  window.Component.ChatBox = ChatBox;
})(window);
