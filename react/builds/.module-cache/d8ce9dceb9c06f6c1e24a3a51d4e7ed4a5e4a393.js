(function(window) {
  var App = React.createClass({displayName: "App",
    getInitialState : function() {
      return {
        name : localStorage.name
      }
    },
    loadSettings : function() {
      this.setState({
        name : localStorage.name
      });
    },
    setName : function(e) {
      var text = $(React.findDOMNode(this.refs.name)).val();
      if (e.keyCode) {
        if (e.keyCode === 13) {
          localStorage.name = text;
          this.loadSettings();
          $('.modal').modal('close');
        }
      } else {
        localStorage.name = text;
        this.loadSettings();
        $('.modal').modal('close');
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
    },
    render : function() {
      return React.createElement("div", null, 
        React.createElement("div", {className: "ui small modal"}, 
          React.createElement("div", {className: "header"}, "What is your name?"), 
          React.createElement("div", {className: "content"}, 
            React.createElement("div", {className: "ui fluid action input"}, 
              React.createElement("input", {type: "text", placeholder: "Enter your name", ref: "name"}), 
              React.createElement("button", {className: "ui blue right labeled button"}, "Enter")
            )
          )
        )
      )
    }
  });
  window.Component.App = App;
})(window);
