var test = require('tape');
var readonly = require('../');
var through = require('through2');
var concat = require('concat-stream');

test('readonly', function (t) {
    t.plan(2);
    
    var stream = through();
    stream.write('woo');
    
    var ro = readonly(stream);
    ro.pipe(concat(function (body) {
        t.equal(body.toString('utf8'), 'woo');
    }));
    
    t.throws(function () {
        ro.write('beep');
    });
    
    stream.end();
});
