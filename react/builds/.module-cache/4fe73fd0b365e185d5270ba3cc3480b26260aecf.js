(function(window) {
  var ChatBox = React.createClass({displayName: "ChatBox",
    render : function() {
      return React.createElement("div", {id: "chatter"}, 
        React.createElement("table", {id: "chat", className: "ui celled striped table left"}, 
          React.createElement("thead", null, 
            React.createElement("tr", null, 
              React.createElement("th", null, "NodeJS Chat App")
            )
          ), 
          React.createElement("tbody", {id: "messages"}
          )
        )
      )
    }
  });
  window.Component.ChatBox = ChatBox;
})(window);
