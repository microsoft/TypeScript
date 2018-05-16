var browserify = require('../');
var test = require('tap').test;

test('ignoreMissing option', function (t) {
    t.test('on browserify', function(t) {
        t.plan(1);
        
        var ignored = browserify({
            entries: [__dirname + '/ignore_missing/main.js'],
            ignoreMissing: true
        });

        ignored.bundle(function(err) {
            t.ok(!err, "bundle completed with missing file ignored");
        });
    });

    t.test('on .bundle', function(t) {
        t.plan(1);
        
        var ignored = browserify(__dirname + '/ignore_missing/main.js', {
            ignoreMissing: true
        });

        ignored.bundle(function(err) {
            t.ok(!err, "bundle completed with missing file ignored");
        });
    });

    t.test('defaults to false', function (t) {
        t.plan(1);
        
        var expected = browserify(__dirname + '/ignore_missing/main.js');

        expected.bundle(function(err) {
            t.ok(err, 'ignoreMissing was false, an error was raised');
        });
    });
    
    t.end();
});
