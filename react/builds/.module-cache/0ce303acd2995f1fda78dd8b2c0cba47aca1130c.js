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
    setName : function() {
      this.stream.emit('name', $(React.findDOMNode(this.refs.name)).val());
    },
    setRoom : function() {
      this.stream.emit('room', $(React.findDOMNode(this.refs.room)).val());
    },
    render : function() {
      return React.createElement("div", {id: "sidebar"}, 
        React.createElement("table", {id: "info", className: "ui celled striped table right"}, 
          React.createElement("thead", null, 
            React.createElement("tr", null, 
              React.createElement("th", null, "Settings")
            ), 
            React.createElement("tr", null, 
              React.createElement("td", null, 
                React.createElement("div", {className: "ui form", ref: "infoForm"}, 
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
                )
              )
            )
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
