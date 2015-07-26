(function(window) {
  localStorage.code = localStorage.code || '(function(time, name, text) {\n\tapi.setBotName(\'My First Bot\');\n\t//\n});';
  var botEditor;

  var Editor = React.createClass({displayName: "Editor",
    componentDidMount : function() {
      var _this = this;

      botEditor = ace.edit('bot-box');
      botEditor.setTheme('ace/theme/chrome');
      botEditor.getSession().setMode('ace/mode/javascript');
      botEditor.setShowPrintMargin(false);
      botEditor.getSession().setValue(localStorage.code);
    },
    addMessage : function(payload) {
      this.state.messages.push(payload);
      this.setState({
        messages : this.state.messages
      });
    },
    getInitialState : function() {
      var error;
      try {
        eval(localStorage.code);
        error = false;
      } catch(e) {
        error = true;
      }
      return {
        messages : [ ],
        error : error
      }
    },
    validate : function() {
      var _this = this;
      var code = $.trim(botEditor.getSession().getValue());
      try {
        var bot = eval(code);
        
        _this.setState({
          error : bot ? false : true
        });
      } catch(e) {
        _this.setState({
          error : true
        });
      }
    },
    back : function() {
      $('#editor').swapPage($('#main'));
    },
    save : function() {
      notify('Bot successfully saved', null, null);
      localStorage.code = botEditor.getSession().getValue();
    },
    sendMessage : function(e) {
      var _this = this;
      var text = $(React.findDOMNode(this.refs.message)).val();

      var exec = function() {
        var payload = {
          time : (new Date()).toLocaleTimeString(),
          name : _this.props.name,
          text : text            
        };
        _this.addMessage(payload);
        
        try {
          (function() {
            var code = botEditor.getSession().getValue();
            var api = (function() {
              var name;

              return {
                setBotName : function(newName) {
                  name = newName;
                },
                setKey : function(key) {
                  $.ajaxSetup({
                    'X-Mashape-Key' : key
                  });
                },
                sendMessage : function(message) {
                  _this.addMessage({
                    time : (new Date()).toLocaleTimeString(),
                    name : name ? name : (localStorage.name + '\'s Bot'),
                    text : message
                  });
                }
              }
            })();
            eval(code)(payload.time, payload.name, payload.text);
          })();
        } catch(e) {
//          window.e = e;
//          console.log(e);
          _this.addMessage({
            time : (new Date()).toLocaleTimeString(),
            name : name ? name : (localStorage.name + '\'s Bot'),
            text : e.message + ' at line ' + e.stack.match(/<anonymous>:(\d)/)[1],
            error : true
          });
        }
        
        $(React.findDOMNode(_this.refs.message)).val('');
        $("#testChatter").animate({ scrollTop: $('#testChatter').prop('scrollHeight')}, 50);
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
        React.createElement("div", {style: _={height:'50%',width:'100%',borderBottom:'1px solid black'}, id: "bot-box", onKeyUp: this.validate}), 
        React.createElement("div", {style: _={height:'50%',width:'calc(100% - 440px)'}, id: "test-box"}, 
          React.createElement("div", {className: "chatter", id: "testChatter"}, 
            React.createElement("table", {style: {margin:'10px'}, className: "ui celled striped table left"}, 
              React.createElement("thead", null, 
                React.createElement("tr", null, 
                  React.createElement("th", null, "Bot Testing")
                )
              ), 
              React.createElement("tbody", null, 
                 this.state.messages.map(function(item, index) {
                  return React.createElement("tr", {key: index}, 
                    React.createElement("td", {style: item.error ? {color:'red'} : {}}, '[' + item.time + '] ' + item.name + ' - ' + item.text)
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
        React.createElement("div", {style: _={position:'absolute',bottom:'25px',right:'180px'}}, 
          React.createElement("i", {className: 'ui huge icon ' + (!this.state.error ? 'green check circle' : 'red minus circle')})
        ), 
        React.createElement("div", {style: _={position:'absolute',bottom:'25px',right:'100px'}, onClick: this.save}, 
          React.createElement("i", {className: "ui huge link save icon"})
        ), 
        React.createElement("div", {style: _={position:'absolute',bottom:'25px',right:'20px'}, onClick: this.back}, 
          React.createElement("i", {className: "ui huge link reply icon"})
        )
      )
    }
  });
  window.Component.Editor = Editor;
})(window);
