var browserify = require('../');
var vm = require('vm');
var test = require('tap').test;

test('plugin fn', function (t) {
    t.plan(2);
    
    var b = browserify(__dirname + '/plugin/main.js', { basedir: __dirname });
    b.plugin(function (b_) {
        t.equal(b, b_);
    });
    
    b.bundle(function (err, src) {
        t.ifError(err);
    });
});

test('plugin module', function (t) {
    t.plan(2);
    
    var b = browserify(__dirname + '/plugin/main.js', { basedir: __dirname });
    b.plugin('plugin-foo', { msg: 'beep boop' });
    
    b.bundle(function (err, src) {
        t.ifError(err);
        t.equal(src.toString('utf8'), 'beep boop');
    });
});
