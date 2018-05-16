var Readable = require('readable-stream').Readable;

module.exports = function (stream) {
    var opts = stream._readableState;
    if (typeof stream.read !== 'function') {
        stream = new Readable(opts).wrap(stream);
    }
    
    var ro = new Readable({ objectMode: opts && opts.objectMode });
    var waiting = false;
    
    stream.on('readable', function () {
        if (waiting) {
            waiting = false;
            ro._read();
        }
    });
    
    ro._read = function () {
        var buf, reads = 0;
        while ((buf = stream.read()) !== null) {
            ro.push(buf);
            reads ++;
        }
        if (reads === 0) waiting = true;
    };
    stream.once('end', function () { ro.push(null) });
    stream.on('error', function (err) { ro.emit('error', err) });
    return ro;
};
