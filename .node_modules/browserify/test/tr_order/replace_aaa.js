var through = require('through2');

module.exports = function(file) {
  return through(function (buf, enc, next) {
    this.push(String(buf)
        .replace(/AAA/g, '5')
    );
    next();
  })
}
