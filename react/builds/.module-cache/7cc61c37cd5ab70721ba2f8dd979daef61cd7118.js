(function(window) {
  var name = localStorage.name;

  var App = React.createClass({displayName: "App",
    setName : function(e) {
      if (e.keyCode) {
        if (e.keyCode === 13) {

        }
      } else {

      }
    },
    componentDidMount : function() {
      if (!name) {
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
              React.createElement("input", {type: "text", placeholder: "Enter your name"}), 
              React.createElement("button", {className: "ui blue right labeled button"}, "Enter")
            )
          )
        )
      )
    }
  });
  window.Component.App = App;
})(window);
