(function(window) {
  localStorage.code = localStorage.code || '(function(time, name, text) {\n\tapi.setBotName(\'My First Bot\');\n\tapi.setKey(\'\');\n\t/*\n\t$.get(\'\').done(function(resp) {\n\t\t\n\t});\n\t*/\n});';
  var botEditor;

  var Editor = React.createClass({
    componentDidMount : function() {
      var _this = this;

      botEditor = ace.edit('bot-box');
      botEditor.setTheme('ace/theme/monokai');
      botEditor.getSession().setMode('ace/mode/javascript');
      botEditor.setShowPrintMargin(false);
      botEditor.getSession().setValue(localStorage.code);
    },
    addMessage : function(payload) {
      this.state.messages.push(payload);
      this.setState({
        messages : this.state.messages
      });
      $("#testChatter").animate({ scrollTop: $('#testChatter').prop('scrollHeight')}, 50);
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
                    headers : {
                      'X-Mashape-Key' : key
                    }
                  });
                },
                sendMessage : function(opts) {
                  _this.addMessage({
                    time : (new Date()).toLocaleTimeString(),
                    name : name ? name : (localStorage.name + '\'s Bot'),
                    text : opts.text,
                    image : opts.image,
                    bot : true
                  });
                }
              }
            })();
            eval(code)(payload.time, payload.name, payload.text);
          })();
        } catch(e) {
          _this.addMessage({
            time : (new Date()).toLocaleTimeString(),
            name : name ? name : (localStorage.name + '\'s Bot'),
            text : e.message + ' at line ' + e.stack.match(/<anonymous>:(\d)/)[1],
            error : true
          });
        }
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
      return <div style={_={height:'100%',display:'none'}} id='editor'>
        <div style={_={height:'50%',width:'100%',borderBottom:'1px solid black'}} id='bot-box' onKeyUp={this.validate}></div>
        <div style={_={height:'50%',width:'calc(100% - 440px)'}} id='test-box'>
          <div className='chatter' id='testChatter'>
            <table style={{margin:'10px'}} className='ui celled striped table left'>
              <thead>
                <tr>
                  <th>Bot Testing</th>
                </tr>
              </thead>
              <tbody>
                { this.state.messages.map(function(item, index) {
                  return <tr key={index}>
                    <td>
                      <span>{'[' + item.time + '] ' + item.name + ' - ' + item.text}</span>
                      <img src={item.image} className='ui small image' style={{display:item.image ? '' : 'none'}} />
                    </td>
                  </tr>
                }) }
              </tbody>
            </table>
          </div>
          <div className='message-box'>
            <div className='ui fluid action input'>
              <input ref='message' type='text' placeholder='Enter message here' autoComplete='off' onKeyUp={this.sendMessage} />
              <button className='ui blue right labeled button' onClick={this.sendMessage}>Send</button>
            </div>
          </div>
        </div>
        <div style={_={position:'absolute',bottom:'25px',right:'180px'}}>
          <i className={'ui huge icon ' + (!this.state.error ? 'green check circle' : 'red minus circle')}></i>
        </div>
        <div style={_={position:'absolute',bottom:'25px',right:'100px'}} onClick={this.save}>
          <i className='ui huge link save icon'></i>
        </div>
        <div style={_={position:'absolute',bottom:'25px',right:'20px'}} onClick={this.back}>
          <i className='ui huge link reply icon'></i>
        </div>
      </div>
    }
  });
  window.Component.Editor = Editor;
})(window);
