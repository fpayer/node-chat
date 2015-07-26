(function(window) {
  var Sidebar = React.createClass({displayName: "Sidebar",
    render : function() {
      return React.createElement("div", {id: "sidebar"}, 
        React.createElement("table", {id: "info", className: "ui celled striped table right"}
        )
      )
    }
  });
  window.Component.Sidebar = Sidebar;
})(window);
