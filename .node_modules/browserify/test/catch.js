var browserify = require('../');
var test = require('tap').test;

test('catch pipeline errors with a callback', function (t) {
    t.plan(2);
    
    var b = browserify(__dirname + '/catch/main.js');
    b.bundle(function (err, src) {
        t.ok(err);
        t.ok(/no_such_file/.test(err));
    });
});

test('catch pipeline errors with an event', function (t) {
    t.plan(2);
    
    var b = browserify(__dirname + '/catch/main.js').bundle();
    b.on('error', function (err) {
        t.ok(err);
        t.ok(/no_such_file/.test(err));
    });
});
