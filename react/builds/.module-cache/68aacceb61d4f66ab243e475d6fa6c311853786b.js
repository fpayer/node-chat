(function(window) {
  var Sidebar = React.createClass({displayName: "Sidebar",
    render : function() {
      return React.createElement("div", {id: "sidebar"}, 
        React.createElement("p", null, this.props.name)
      )
    }
  });
  window.Component.Sidebar = Sidebar;
})(window);
