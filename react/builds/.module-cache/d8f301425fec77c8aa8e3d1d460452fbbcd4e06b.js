(function(window) {
  localStorage.code = localStorage.code || 'function() {\n\t\n}';

  var Editor = React.createClass({displayName: "Editor",
    componentDidMount : function() {
      var _this = this;

      var botEditor = ace.edit('bot-box');
      botEditor.setTheme('ace/theme/chrome');
      botEditor.getSession().setMode('ace/mode/javascript');
      botEditor.setShowPrintMargin(false);

      botEditor.getSession().setValue(localStorage.code);
    },
    back : function() {
      $('#editor').swapPage($('#main'));
    },
    render : function() {
      return React.createElement("div", {style: _={height:'100%',display:'none'}, id: "editor"}, 
        React.createElement("div", {style: _={height:'50%',width:'100%'}, id: "bot-box"}
        ), 
        React.createElement("div", {style: _={height:'50%',width:'100%'}, id: "test-box"}
        ), 
        React.createElement("div", {style: _={position:'absolute',bottom:'25px',right:'20px'}, onClick: this.back}, 
          React.createElement("i", {className: "ui big link reply icon"})
        )
      )
    }
  });
  window.Component.Editor = Editor;
})(window);
