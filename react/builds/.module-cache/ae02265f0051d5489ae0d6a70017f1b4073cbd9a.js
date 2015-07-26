(function(window) {
  localStorage.room = localStorage.room || 'All';

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
    },
    setName : function(e) {
      var text = $(React.findDOMNode(this.refs.name)).val();
      if (e.keyCode) {
        if (e.keyCode === 13) {
          localStorage.name = text;
          this.loadSettings();
          $('.modal').modal('hide');
        }
      } else {
        localStorage.name = text;
        this.loadSettings();
        $('.modal').modal('hide');
      }
    },
    componentDidMount : function() {
      if (!this.state.name) {
        $('.modal').modal({
          closable : false,
          onShow : function() {
            $('.modal input').focus();
          }
        }).modal('show');
      }
      this.loadSettings();
    },
    render : function() {
      return React.createElement("div", null, 
        React.createElement(Component.ChatBox, null), 
        React.createElement(Component.Sidebar, {name: this.state.name}), 
        React.createElement("div", {className: "ui small modal"}, 
          React.createElement("div", {className: "header"}, "What is your name?"), 
          React.createElement("div", {className: "content"}, 
            React.createElement("div", {className: "ui fluid action input"}, 
              React.createElement("input", {type: "text", placeholder: "Enter your name", ref: "name", onKeyUp: this.setName}), 
              React.createElement("button", {className: "ui blue right labeled button", onClick: this.setName}, "Enter")
            )
          )
        )
      )
    }
  });
  window.Component.App = App;
})(window);
