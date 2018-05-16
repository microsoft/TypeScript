var browserify = require('../');
var vm = require('vm');
var path = require('path');
var test = require('tap').test;

test('entry - relative path', function (t) {
    process.chdir(__dirname);
    
    t.plan(3);
    
    var b = browserify('entry/main.js');
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

test('entry - relative path via add', function (t) {
    t.plan(3);
    
    var b = browserify({basedir: __dirname});
    b.add('entry/main.js');
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
