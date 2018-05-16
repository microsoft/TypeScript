const isV8flags = require('./is-v8flags');

module.exports = function (flags, argv) {
  if (!argv) {
    argv = process.argv;
  }
  var args = [argv[1]];
  argv.slice(2).forEach(function (arg) {
    var flag = arg.split('=')[0];
    if (isV8flags(flag, flags)) {
      args.unshift(arg);
    } else {
      args.push(arg);
    }
  });
  args.unshift(argv[0]);
  return args;
};
