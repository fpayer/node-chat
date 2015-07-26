(function(window) {
  var Editor = React.createClass({displayName: "Editor",
    render : function() {
      return React.createElement("div", {style: _={height:'100%',display:'none'}}
      )
    }
  });
  window.Component.Editor = Editor;
})(window);
