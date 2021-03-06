(function(window) {
  var stream = new DuplexEvent();
  localStorage.room = localStorage.room || 'All';

  window.api = (function() {
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
        socket.emit('message', {
          time : (new Date()).toLocaleTimeString(),
          name : name ? name : (localStorage.name + '\'s Bot'),
          text : opts.text,
          image : opts.image,
          bot : true
        });
      }
    }
  })();

  var App = React.createClass({displayName: "App",
    getInitialState : function() {
      return {
        name : localStorage.name,
        room : localStorage.room
      }
    },
    loadSettings : function() {
      this.setState({
        name : localStorage.name,
        room : localStorage.room
      });
      $(React.findDOMNode(this.refs.name)).val(localStorage.name);
      $(React.findDOMNode(this.refs.room)).val(localStorage.room);
      socket.emit('join', localStorage.room);
      socket.emit('name', localStorage.name);
    },
    setName : function(e) {
      var text = $(React.findDOMNode(this.refs.name)).val();
      if (e.keyCode) {
        if (e.keyCode === 13 && text.trim() !== '') {
          localStorage.name = text;
          this.loadSettings();
          $('.modal').modal('hide');
          stream.emit('setName', text);
        }
      } else {
        localStorage.name = text;
        this.loadSettings();
        $('.modal').modal('hide');
        stream.emit('setName', text);
      }
    },
    componentDidMount : function() {
      var _this = this;
      if (!this.state.name) {
        $('.modal').modal({
          closable : false,
          onShow : function() {
            $('.modal input').focus();
          }
        }).modal('show');
      } 
      stream.on('name', function(e, name) {
        localStorage.name = name;
        _this.loadSettings();
      });
      stream.on('room', function(e, room) {
        localStorage.room = room;
        _this.loadSettings();
      });
      this.loadSettings();
    },
    render : function() {
      return React.createElement("div", {style: {height:'100%'}}, 
        React.createElement("div", {style: {height:'100%'}, id: "main"}, 
          React.createElement(Component.ChatBox, {name: this.state.name, room: this.state.room, stream: stream}), 
          React.createElement(Component.Sidebar, {name: this.state.name, room: this.state.room, stream: stream}), 
          React.createElement("div", {className: "ui small modal"}, 
            React.createElement("div", {className: "header"}, "What is your name?"), 
            React.createElement("div", {className: "content"}, 
              React.createElement("div", {className: "ui fluid action input"}, 
                React.createElement("input", {type: "text", placeholder: "Enter your name", ref: "name", onKeyUp: this.setName}), 
                React.createElement("button", {className: "ui blue right labeled button", onClick: this.setName}, "Enter")
              )
            )
          )
        ), 
        React.createElement(Component.Editor, {name: this.state.name})
      )
    }
  });
  window.Component.App = App;
})(window);
