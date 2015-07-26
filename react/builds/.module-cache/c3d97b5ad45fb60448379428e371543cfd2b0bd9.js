(function(window) {
  var Sidebar = React.createClass({displayName: "Sidebar",
    render : function() {
      return React.createElement("div", {id: "sidebar"}, 
        React.createElement("table", {id: "info", className: "ui celled striped table right"}, 
          React.createElement("thead", null, 
            React.createElement("tr", null, 
              React.createElement("th", null, "File Upload")
            )
          )
        )
      )
    }
  });
  window.Component.Sidebar = Sidebar;
})(window);
