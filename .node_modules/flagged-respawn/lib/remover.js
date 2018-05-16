const isV8flags = require('./is-v8flags');

module.exports = function(flags, argv) {
  var args = argv.slice(0, 1);
  for (var i = 1, n = argv.length; i < n; i++) {
    var arg = argv[i];
    var flag = arg.split('=')[0];
    if (!isV8flags(flag, flags)) {
      args.push(arg);
    }
  }
  return args;
};
