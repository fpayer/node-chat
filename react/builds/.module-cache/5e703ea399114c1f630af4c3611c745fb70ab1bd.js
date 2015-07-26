(function(window) {
  var Editor = React.createClass({displayName: "Editor",
    componentDidMount : function() {
      var _this = this;

      var editor = ace.edit('code-box');
      editor.setTheme('ace/theme/chrome');
      editor.getSession().setMode('ace/mode/javascript');
      editor.setShowPrintMargin(false);
    },
    back : function() {
      $('#editor').swapPage($('#main'));
    },
    render : function() {
      return React.createElement("div", {style: _={height:'100%',display:'none'}, id: "editor"}, 
        React.createElement("div", {style: _={height:'100%',width:'100%'}, id: "code-box"}
        ), 
        React.createElement("div", {style: _={position:'absolute',bottom:'25px',right:'20px'}, onClick: this.back}, 
          React.createElement("i", {className: "ui big white link reply icon"})
        )
      )
    }
  });
  window.Component.Editor = Editor;
})(window);
