var browserify = require('../');
var vm = require('vm');
var path = require('path');
var test = require('tap').test;

var testFiles = [
    path.join(__dirname, 'multi_entry_cross_require/a.js'),
    path.join(__dirname, 'multi_entry_cross_require/lib/b.js'),
    path.join(__dirname, 'multi_entry_cross_require/c.js')
];

test('multi entry cross require', function (t) {
    t.plan(8);

    var b = browserify([
        testFiles[0],
        testFiles[1]
    ]);
    b.add(testFiles[2]);
    
    b.on('dep', function(row) {
        if (row.entry) {
            t.ok(testFiles.indexOf(row.file) > -1, 'should contain full entry path');
        }
    });
    
    b.bundle(function (err, src) {
        if (err) throw err;
        var c = {
            times : 0,
            t : t
        };
        vm.runInNewContext(src, c);
    });
});

test('multi entry cross require - relative cwd', function (t) {
    t.plan(8);

    var dsTestFiles = testFiles.map(function(x) {
        return x.replace(__dirname + '/', './');
    });

    var b = browserify({
        entries: [dsTestFiles[0], dsTestFiles[1]],
        basedir: __dirname
    });
    b.add(dsTestFiles[2]);
    
    b.on('dep', function(row) {
        if (row.entry) {
            t.ok(testFiles.indexOf(row.file) > -1, 'should contain full entry path');
        }
    });
    
    b.bundle(function (err, src) {
        if (err) throw err;
        var c = {
            times : 0,
            t : t
        };
        vm.runInNewContext(src, c);
    });
});

test('multi entry cross require - relative', function (t) {
    t.plan(8);

    var rTestFiles = testFiles.map(function(x) {
        return x.replace(__dirname + '/', '');
    });

    var b = browserify({
        entries: [rTestFiles[0], rTestFiles[1]],
        basedir: __dirname
    });
    b.add(rTestFiles[2]);
    
    b.on('dep', function(row) {
        if (row.entry) {
            t.ok(testFiles.indexOf(row.file) > -1, 'should contain full entry path');
        }
    });
    
    b.bundle(function (err, src) {
        if (err) throw err;
        var c = {
            times : 0,
            t : t
        };
        vm.runInNewContext(src, c);
    });
});
