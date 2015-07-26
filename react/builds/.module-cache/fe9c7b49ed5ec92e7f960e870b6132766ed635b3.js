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
    getInitialState : function() {
      return {
        messages : [ ]
      }
    },
    back : function() {
      $('#editor').swapPage($('#main'));
    },
    sendMessage : function(e) {
      var _this = this;
      var text = $(React.findDOMNode(this.refs.message)).val();

      var exec = function() {
        var time = new Date();
        _this.state.messages.push('[' + time.toLocaleTimeString() + '] ' + _this.props.name + ' - ' + text);
        _this.setState({
          messages : _this.state.messages
        });
        $(React.findDOMNode(_this.refs.message)).val('');
      }

      if (e.keyCode) {
        if (e.keyCode === 13 && text.trim() !== '') {
          exec();
        }
      } else {
        exec();
      }

    },
    render : function() {
      return React.createElement("div", {style: _={height:'100%',display:'none'}, id: "editor"}, 
        React.createElement("div", {style: _={height:'50%',width:'100%',borderBottom:'1px solid black'}, id: "bot-box"}
        ), 
        React.createElement("div", {style: _={height:'50%',width:'calc(100% - 440px)'}, id: "test-box"}, 
          React.createElement("div", {className: "chatter"}, 
            React.createElement("table", {style: {margin:'10px'}, className: "ui celled striped table left"}, 
              React.createElement("thead", null, 
                React.createElement("tr", null, 
                  React.createElement("th", null, "Bot Testing")
                )
              ), 
              React.createElement("tbody", null, 
                 this.state.messages.map(function(item, index) {
                  return React.createElement("tr", {key: index}, 
                    React.createElement("td", null, item)
                  )
                }) 
              )
            )
          ), 
          React.createElement("div", {className: "message-box"}, 
            React.createElement("div", {className: "ui fluid action input"}, 
              React.createElement("input", {ref: "message", type: "text", placeholder: "Enter message here", autoComplete: "off", onKeyUp: this.sendMessage}), 
              React.createElement("button", {className: "ui blue right labeled button", onClick: this.sendMessage}, "Send")
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
