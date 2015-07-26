(function(window) {
  var Sidebar = React.createClass({displayName: "Sidebar",
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
              React.createElement("input", {type: "text", name: "name", ref: "name"})
            ), 
            React.createElement("div", {className: "field"}, 
              React.createElement("label", null, "Chatroom"), 
              React.createElement("input", {type: "text", name: "room", ref: "room"})
            )
          ), 
          React.createElement("div", {className: "field"}
          )
        ), 
        React.createElement("table", {className: "ui celled striped table right"}, 
          React.createElement("thead", null, 
            React.createElement("tr", null, 
              React.createElement("th", null, 
              "Online Users"
              )
            ), 
            React.createElement("tr", null, 
              React.createElement("td", null, 
              React.createElement("div", {id: "user-list", className: "ui divided list"})
              )
            )
          )
        )
      )
    }
  });
  window.Component.Sidebar = Sidebar;
})(window);
