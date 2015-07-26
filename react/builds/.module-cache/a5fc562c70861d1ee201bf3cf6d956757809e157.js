(function(window) {
  var Editor = React.createClass({displayName: "Editor",

    render : function() {
      return React.createElement("div", {style: _={height:'100%',display:'none'}, id: "editor"}, 
        React.createElement("div", {style: {height:'100%'}}
        ), 
        React.createElement("div", {style: _={position:'absolute',bottom:'25px',right:'20px'}}, 
          React.createElement("i", {className: "ui large link save icon"})
        )
      )
    }
  });
  window.Component.Editor = Editor;
})(window);
