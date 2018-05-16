var test = require('tape');
var readonly = require('../');
var through = require('through');
var concat = require('concat-stream');

test('streams1', function (t) {
    t.plan(2);
    
    var stream = through();
    
    var ro = readonly(stream);
    ro.pipe(concat(function (body) {
        t.equal(body.toString('utf8'), 'woo');
    }));
    
    t.throws(function () {
        ro.write('beep');
    });
    
    stream.end('woo');
});
