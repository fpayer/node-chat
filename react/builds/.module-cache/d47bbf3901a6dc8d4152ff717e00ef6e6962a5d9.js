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
                React.createElement("div", {class: "ui fluid input"}, 
                  React.createElement("form", {id: "dropzone", class: "dropzone", style: "border:1px solid rgba(0,0,0,0.03); min-height:240px; -webkit-border-radius: 3px; border-radius:3px; background: rgba(0,0,0,0.03); padding: 23px; position: relative; cursor:pointer", action: "/upload/"}, 
                    React.createElement("div", {class: "dz-default"}, 
                      React.createElement("div", {class: "dz-default dz-message", style: "text-align:center"}, 
                        React.createElement("h2", {class: "ui icon header", style: "margin-top:30px", id: "uploadMessage"}, 
                          React.createElement("i", {class: "upload icon"}), 
                          React.createElement("div", {class: "content"}, 
                            "Drag your files here to upload ", React.createElement("div", {class: "sub header"}, "(Or click to select files)")
                          )
                        ), 
                        React.createElement("div", {class: "ui icon positive message", id: "successMessage", style: "display:none; margin-top: 70px; text-align: left"}, 
                          React.createElement("i", {class: "checkmark icon"}), 
                          React.createElement("div", {class: "content"}, 
                            React.createElement("div", {class: "header"}, "Success"), 
                            React.createElement("p", null, " File uploaded. Drag another file or click here to upload again. ")
                          )
                        ), 
                        React.createElement("div", {class: "ui icon negative message", id: "failMessage", style: "display:none; margin-top: 70px; text-align: left"}, 
                          React.createElement("i", {class: "remove icon"}), 
                          React.createElement("div", {class: "content"}, 
                            React.createElement("div", {class: "header"}, "Failure"), 
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
