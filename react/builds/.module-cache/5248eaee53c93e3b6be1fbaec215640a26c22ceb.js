(function(window) {
  var Sidebar = React.createClass({displayName: "Sidebar",
    render : function() {
      return React.createElement("div", {id: "sidebar"}, 
        React.createElement("p", null, "Test")
      )
    }
  });
  window.Component.Sidebar = Sidebar;
})(window);
