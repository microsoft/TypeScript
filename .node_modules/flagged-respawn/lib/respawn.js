const spawn = require('child_process').spawn;

module.exports = function (argv) {
  var child = spawn(argv[0], argv.slice(1), { stdio: 'inherit' });
  child.on('exit', function (code, signal) {
    process.on('exit', function () {
      /* istanbul ignore if */
      if (signal) {
        process.kill(process.pid, signal);
      } else {
        process.exit(code);
      }
    });
  });
  return child;
};
