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
                      React.createElement("div", {className: "dz-default dz-message", style: "text-align:center"}, 
                        React.createElement("h2", {className: "ui icon header", style: "margin-top:30px", id: "uploadMessage"}, 
                          React.createElement("i", {className: "upload icon"}), 
                          React.createElement("div", {className: "content"}, 
                            "Drag your files here to upload ", React.createElement("div", {className: "sub header"}, "(Or click to select files)")
                          )
                        ), 
                        React.createElement("div", {className: "ui icon positive message", id: "successMessage", style: "display:none; margin-top: 70px; text-align: left"}, 
                          React.createElement("i", {className: "checkmark icon"}), 
                          React.createElement("div", {className: "content"}, 
                            React.createElement("div", {className: "header"}, "Success"), 
                            React.createElement("p", null, " File uploaded. Drag another file or click here to upload again. ")
                          )
                        ), 
                        React.createElement("div", {className: "ui icon negative message", id: "failMessage", style: "display:none; margin-top: 70px; text-align: left"}, 
                          React.createElement("i", {className: "remove icon"}), 
                          React.createElement("div", {className: "content"}, 
                            React.createElement("div", {className: "header"}, "Failure"), 
                            React.createElement("p", null, " We could not upload your file.")
                          )
                        )
                      )
                    )
                  )
                )
              )
            )
            )
            )
        )
    }
  });
  window.Component.Sidebar = Sidebar;
})(window);
