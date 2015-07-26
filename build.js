var fs = require('fs');
var compressor = require('node-minify');
var react = './react/builds/';

var getReact = function() {
  return fs.readdirSync(react).reduce(function(acc, item) {
    if (/.js$/.test(item)) {
      acc.push(react + item);
    }
    return acc;
  }, []);
};

new compressor.minify({
  type : 'uglifyjs',
  fileIn : getReact(),
  fileOut : './static/js/components.min.js',
  callback : function(err) {
    if (err) {
      console.error(err);
    }
  }
});
