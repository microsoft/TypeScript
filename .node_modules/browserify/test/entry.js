var browserify = require('../');
var vm = require('vm');
var path = require('path');
var test = require('tap').test;

test('entry', function (t) {
    t.plan(3);
    
    var b = browserify(__dirname + '/entry/main.js');
    b.on('dep', function(row) {
        if (row.entry) t.equal(row.file, path.join(__dirname, 'entry/main.js'));
    });
    b.bundle(function (err, src) {
        var c = {
            done : function (one, two) {
                t.equal(one, 1);
                t.equal(two, 2);
                t.end();
            }
        };
        vm.runInNewContext(src, c);
    });
});

test('entry via add', function (t) {
    t.plan(3);
    
    var b = browserify();
    b.add(__dirname + '/entry/main.js');
    b.on('dep', function(row) {
        if (row.entry) t.equal(row.file, path.join(__dirname, 'entry/main.js'));
    });
    b.bundle(function (err, src) {
        var c = {
            done : function (one, two) {
                t.equal(one, 1);
                t.equal(two, 2);
                t.end();
            }
        };
        vm.runInNewContext(src, c);
    });
});
