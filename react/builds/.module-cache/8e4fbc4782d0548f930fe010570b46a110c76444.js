(function(window) {
  var Sidebar = React.createClass({displayName: "Sidebar",
    render : function() {
      return React.createElement("div", null, 
        React.createElement("p", null, "Test")
      )
    }
  });
  window.Component.Sidebar = Sidebar;
})(window);
