var browserify = require('../');
var test = require('tap').test;

test('standalone bundle close event', {timeout: 1000}, function (t) {
    t.plan(1);

    var ended = false;

    var b = browserify(__dirname + '/standalone/main.js', {
        standalone: 'stand-test'
    });
    var r = b.bundle();
    r.resume();
    r.on('end', function() {
        t.ok(!ended);
        ended = true;
        t.end();
    });
});
