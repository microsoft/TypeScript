var test = require('tape');
var readonly = require('../');
var through = require('through2');

test('error', function (t) {
    t.plan(1);
    
    var stream = through();
    var ro = readonly(stream);

    ro.on('error', function (err) {
        t.ok(err);
    });
    stream.emit('error', new Error);
});
