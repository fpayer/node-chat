(function(window) {
  var ChatBox = React.createClass({displayName: "ChatBox",
    componentDidMount : function() {
      var _this = this;

      socket.on('message', function(data) {
        _this.state.messages.push(data);
        _this.setState({
          messages : _this.state.messages
        });
      });
    },
    getInitialState : function() {
      return {
        messages : [ ]
      }
    },
    render : function() {
      return React.createElement("div", null, 
        React.createElement("div", {id: "chatter"}, 
          React.createElement("table", {id: "chat", className: "ui celled striped table left"}, 
            React.createElement("thead", null, 
              React.createElement("tr", null, 
                React.createElement("th", null, "NodeJS Chat App")
              )
            ), 
            React.createElement("tbody", {id: "messages"}, 
               this.state.messages.map(function(item, index) {
                return React.createElement("tr", {key: index}, 
                  React.createElement("td", null, item)
                )
              }) 
            )
          )
        ), 
        React.createElement("div", {id: "message-box"}, 
          React.createElement("div", {className: "ui fluid action input"}, 
            React.createElement("input", {id: "message-input", type: "text", placeholder: "Enter message here", autoComplete: "off"}), 
            React.createElement("button", {id: "message-btn", className: "ui blue right labeled button"}, "Send")
          )
        )
      )
    }
  });
  window.Component.ChatBox = ChatBox;
})(window);
