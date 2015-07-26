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

      /*
      var testEditor = ace.edit('test-box');
      testEditor.setTheme('ace/theme/chrome');
      testEditor.getSession().setMode('ace/mode/javascript');
      testEditor.setShowPrintMargin(false);
      testEditor.getSession().setValue(localStorage.code);
      */
    },
    back : function() {
      $('#editor').swapPage($('#main'));
    },
    render : function() {
      return React.createElement("div", {style: _={height:'100%',display:'none'}, id: "editor"}, 
        React.createElement("div", {style: _={height:'50%',width:'100%',borderBottom:'1px solid black'}, id: "bot-box"}
        ), 
        React.createElement("div", {style: _={height:'50%',width:'100%'}, id: "test-box"}, 
          React.createElement("div", {className: "chatter"}, 
            React.createElement("table", {style: {margin:'10px'}, className: "ui celled striped table left"}, 
              React.createElement("thead", null, 
                React.createElement("tr", null, 
                  React.createElement("th", null, "Bot Testing")
                )
              )
            )
          )
        ), 
        React.createElement("div", {style: _={position:'absolute',bottom:'25px',right:'20px'}, onClick: this.back}, 
          React.createElement("i", {className: "ui big link reply icon"})
        )
      )
    }
  });
  window.Component.Editor = Editor;
})(window);
