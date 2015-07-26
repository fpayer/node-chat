(function(window) {
  var Editor = React.createClass({displayName: "Editor",

    render : function() {
      return React.createElement("div", {style: _={height:'100%',display:'none'}, id: "editor"}
      )
    }
  });
  window.Component.Editor = Editor;
})(window);
