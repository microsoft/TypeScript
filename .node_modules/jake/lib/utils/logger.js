var util = require('util');

var logger = new (function () {
  var _output = function (type, out) {
    var quiet = typeof jake != 'undefined' && jake.program &&
        jake.program.opts && jake.program.opts.quiet
      , msg;
    if (!quiet) {
      msg = typeof out == 'string' ? out : util.inspect(out);
      console[type](msg);
    }
  };

  this.log = function (out) {
    _output('log', out);
  };

  this.error = function (out) {
    _output('error', out);
  };

})();

module.exports = logger;
