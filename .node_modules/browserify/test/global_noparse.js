var browserify = require('../');
var vm = require('vm');
var path = require('path');
var test = require('tap').test;

test('global noparse module', function (t) {
    t.plan(2);
    
    var b = browserify({
        noParse: 'aaa'
    });
    b.require(__dirname + '/global/node_modules/aaa', { expose: 'x' });
    b.bundle(function (err, src) {
        var c = {
            __filename: __filename,
            __dirname: __dirname
        };
        vm.runInNewContext(src, c);
        var x = c.require('x');
        t.equal(x.filename, __filename);
        t.equal(x.dirname, __dirname);
    });
});

test('global noparse module file', function (t) {
    t.plan(2);
    
    var b = browserify({
        noParse: 'aaa/index.js'
    });
    b.require(__dirname + '/global/node_modules/aaa', { expose: 'x' });
    b.bundle(function (err, src) {
        var c = {
            __filename: __filename,
            __dirname: __dirname
        };
        vm.runInNewContext(src, c);
        var x = c.require('x');
        t.equal(x.filename, __filename);
        t.equal(x.dirname, __dirname);
    });
});

test('global noparse module deep file', function (t) {
    t.plan(2);
    
    var b = browserify({
        noParse: 'robot/lib/beep.js'
    });
    b.require(__dirname + '/global/node_modules/robot', { expose: 'x' });
    b.bundle(function (err, src) {
        var c = {
            __filename: __filename,
            __dirname: __dirname
        };
        vm.runInNewContext(src, c);
        var x = c.require('x');
        t.equal(x.filename, __filename);
        t.equal(x.dirname, __dirname);
    });
});

test('global noparse basedir', function (t) {
    t.plan(2);
    
    var b = browserify({
        basedir: __dirname + '/global',
        noParse: 'filename.js'
    });
    b.require(__dirname + '/global/filename.js', { expose: 'x' });
    b.bundle(function (err, src) {
        var c = {
            __filename: __filename,
            __dirname: __dirname
        };
        vm.runInNewContext(src, c);
        var x = c.require('x');
        t.equal(x.filename, __filename);
        t.equal(x.dirname, __dirname);
    });
});

test('global noparse function', function (t) {
    t.plan(2);

    var b = browserify({
        noParse: function(file) {
            return file === path.join(__dirname, 'global/filename.js');
        }
    });
    b.require(__dirname + '/global/filename.js', { expose: 'x' });
    b.bundle(function (err, src) {
        var c = {
            __filename: __filename,
            __dirname: __dirname
        };
        vm.runInNewContext(src, c);
        var x = c.require('x');
        t.equal(x.filename, __filename);
        t.equal(x.dirname, __dirname);
    });
});
