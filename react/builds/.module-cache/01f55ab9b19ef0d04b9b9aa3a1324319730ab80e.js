(function(window) {
  var Sidebar = React.createClass({displayName: "Sidebar",
    componentDidMount : function() {
      var _this = this;

      socket.on('users', function(users) {
        _this.setState({
          users : users
        });
      });
    },
    getInitialState : function() {
      return {
        users : [ ]
      }
    },
    render : function() {
      return React.createElement("div", {id: "sidebar"}, 
        React.createElement("table", {id: "info", className: "ui celled striped table right"}, 
          React.createElement("thead", null, 
            React.createElement("tr", null, 
              React.createElement("th", null, "File Upload")
            ), 
            React.createElement("tr", null, 
              React.createElement("td", null, 
                React.createElement("div", {className: "ui fluid input"}, 
                  React.createElement("form", {id: "dropzone", className: "dropzone", action: "/upload/"}, 
                    React.createElement("div", {className: "dz-default"}, 
                      React.createElement("div", {className: "dz-default dz-message", style: {textAlign:'center'}}, 
                        React.createElement("h2", {className: "ui icon header", style: {marginTop:'30px'}, id: "uploadMessage"}, 
                          React.createElement("i", {className: "upload icon"}), 
                          React.createElement("div", {className: "content"}, 
                            "Drag your files here to upload ", React.createElement("div", {className: "sub header"}, "(Or click to select files)")
                          )
                        )
                      )
                    )
                  )
                )
              )
            )
          )
        ), 
        React.createElement("div", {className: "ui raised segment form", ref: "infoForm"}, 
          React.createElement("div", {className: "two fields"}, 
            React.createElement("div", {className: "field"}, 
              React.createElement("label", null, "Username"), 
              React.createElement("input", {type: "text", name: "name", defaultValue: this.props.name})
            ), 
            React.createElement("div", {className: "field"}, 
              React.createElement("label", null, "Chatroom"), 
              React.createElement("input", {type: "text", name: "room", defaultValue: this.props.room})
            )
          ), 
          React.createElement("div", {className: "field"}, 
            React.createElement("div", {className: "ui fluid blue button"}, "Configure Bot")
          )
        ), 
        React.createElement("table", {className: "ui celled striped table right"}, 
          React.createElement("thead", null, 
            React.createElement("tr", null, 
              React.createElement("th", null, 
              "Online Users"
              )
            )
          ), 
          React.createElement("tbody", null, 
             this.state.users.map(function(user) {
              return React.createElement("tr", {key: user}, 
                React.createElement("td", null, user)
              )
            }) 
          )
        )
      )
    }
  });
  window.Component.Sidebar = Sidebar;
})(window);
