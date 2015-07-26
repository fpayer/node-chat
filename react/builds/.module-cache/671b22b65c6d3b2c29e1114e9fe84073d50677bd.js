(function(window) {
  var ChatBox = React.createClass({displayName: "ChatBox",
    addMessage : function(payload) {
      this.state.messages.push(payload);
      this.setState({
        messages : this.state.messages
      });
    },
    componentDidMount : function() {
      var _this = this;

      socket.on('message', function(data) {
        _this.addMessage(data);
        $("#chatter").animate({ scrollTop: $('#chatter').prop('scrollHeight')}, 50);
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
      return React.createElement("div", {style: _={height:'100%',width:'calc(100% - 440px)'}}, 
        React.createElement("div", {id: "chatter", className: "chatter"}, 
          React.createElement("table", {id: "chat", className: "ui celled striped table left"}, 
            React.createElement("thead", null, 
              React.createElement("tr", null, 
                React.createElement("th", null, "NodeJS Chat App")
              )
            ), 
            React.createElement("tbody", {id: "messages"}, 
               this.state.messages.map(function(item, index) {
                return React.createElement("tr", {key: index}, 
                  React.createElement("td", null, '[' + item.time + '] ' + item.name + ' - ' + item.text)
                )
              }) 
            )
          )
        ), 
        React.createElement("div", {id: "message-box", className: "message-box"}, 
          React.createElement("div", {className: "ui fluid action input"}, 
            React.createElement("input", {ref: "message", id: "message-input", type: "text", placeholder: "Enter message here", autoComplete: "off", onKeyUp: this.sendMessage}), 
            React.createElement("button", {id: "message-btn", className: "ui blue right labeled button", onClick: this.sendMessage}, "Send")
          )
        )
      )
    }
  });
  window.Component.ChatBox = ChatBox;
})(window);
