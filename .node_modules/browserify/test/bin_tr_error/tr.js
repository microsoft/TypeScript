var through = require('through2');

module.exports = function (file, opts) {
    var data = '';
    return through(write, end);
    
    function write (buf, enc, next) { data += buf; next() }
    function end () {
        this.emit('error', new Error('there was error'))
        this.push(null);
    }
};
