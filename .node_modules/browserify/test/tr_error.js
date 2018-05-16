var browserify = require('../');
var vm = require('vm');
var test = require('tap').test;
var through = require('through2');

test('transform errors errback', function (t) {
    t.plan(2);
    
    var b = browserify(__dirname + '/tr/main.js');
    b.transform(function (file) {
        return through(function (buf) {
            this.emit('error', new Error('blah'));
        })
    });
    b.bundle(function (err, src) {
        t.ok(/^blah/.test(err.message));
        t.equal(src, undefined);
    });
});

test('transform errors propagate', function (t) {
    t.plan(1);
    
    var b = browserify(__dirname + '/tr/main.js');
    b.transform(function (file) {
        return through(function (buf) {
            this.emit('error', new Error('blah'));
        });
    });
    b.bundle().on('error', function (err) {
        t.ok(/^blah/.test(err.message));
    });
});
