var assert = require('assert');
var browserify = require('../');
var vm = require('vm');
var test = require('tap').test;

test('fieldString', function (t) {
    t.plan(1);
    
    var b = browserify();
    b.require(__dirname + '/field/string.js', { expose: './string.js' });
    b.bundle(function (err, src) {
        if (err) return t.fail(err);
        
        var c = {};
        vm.runInNewContext(src, c);
        t.equal(
            c.require('./string.js'),
            'browser'
        );
    });
});

test('fieldObject', function (t) {
    t.plan(1);
    
    var b = browserify();
    b.require(__dirname + '/field/object.js', { expose: './object.js' });
    b.bundle(function (err, src) {
        if (err) return t.fail(err);
        
        var c = {};
        vm.runInNewContext(src, c);
        t.equal(
            c.require('./object.js'),
            '!browser'
        );
    });
});

test('missObject', function (t) {
    t.plan(1);
    
    var b = browserify();
    b.require(__dirname + '/field/miss.js', { expose: './miss.js' });
    b.bundle(function (err, src) {
        if (err) return t.fail(err);
        
        var c = {};
        vm.runInNewContext(src, c);
        t.equal(
            c.require('./miss.js'),
            '!browser'
        );
    });
});

test('fieldSub', function (t) {
    t.plan(1);
    
    var b = browserify();
    b.require(__dirname + '/field/sub.js', { expose: './sub.js' });
    b.bundle(function (err, src) {
        if (err) return t.fail(err);
        
        var c = {};
        vm.runInNewContext(src, c);
        t.equal(
            c.require('./sub.js'),
            'browser'
        );
    });
});
