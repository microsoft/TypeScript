var browserify = require('../');
var vm = require('vm');
var test = require('tap').test;

test('circular', function (t) {
    t.plan(1);
    
    var b = browserify(__dirname + '/circular/main.js');
    b.bundle(function (err, src) {
        vm.runInNewContext(src, { t: t });
    });
});

test('circular expose', function (t) {
    t.plan(1);
    
    var b = browserify(__dirname + '/circular/main.js');
    b.require(__dirname + '/circular/a.js', { expose: './a.js' });
    b.require(__dirname + '/circular/b.js', { expose: './b.js' });
    b.bundle(function (err, src) {
        vm.runInNewContext(src, { t: t });
    });
});

test('circular require', function (t) {
    t.plan(1);
    
    var b = browserify(__dirname + '/circular/main.js');
    b.require(__dirname + '/circular/a.js');
    b.require(__dirname + '/circular/b.js');
    b.bundle(function (err, src) {
        vm.runInNewContext(src, { t: t });
    });
});
