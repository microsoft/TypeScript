var browserify = require('../');
var vm = require('vm');
var path = require('path');
var test = require('tap').test;
var fs = require('fs');

var testFiles = [
    path.join(__dirname, 'multi_entry/a.js'),
    path.join(__dirname, 'multi_entry/b.js'),
    path.join(__dirname, 'multi_entry/c.js')
];

test('multi entry', function (t) {
    t.plan(6);
    
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
        var c = {
            times : 0,
            t : t
        };
        vm.runInNewContext(src, c);
    });
});

test('multi entry relative', function (t) {
    t.plan(6);
    
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
        var c = {
            times : 0,
            t : t
        };
        vm.runInNewContext(src, c);
    });
});

test('multi entry relative cwd', function (t) {
    t.plan(6);
    
    var rTestFiles = testFiles.map(function(x) {
        return x.replace(__dirname + '/', './');
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
        var c = {
            times : 0,
            t : t
        };
        vm.runInNewContext(src, c);
    });
});

test('entries as streams', function (t) {
    t.plan(6);
    
    // commondir blows up with streams and without basedir
    var opts = { basedir: __dirname + '/multi_entry' };
    
    var b = browserify([
        fs.createReadStream(testFiles[0]),
        fs.createReadStream(testFiles[1])
    ], opts);
    b.add(fs.createReadStream(testFiles[2]));
    
    b.on('dep', function(row) {
        if (row.entry) {
            t.similar(
                row.file,
                RegExp(path.join(__dirname, 'multi_entry/_stream_').replace(/\\/g, '\\\\') + '[\\d].js'),
                'should be full entry path'
            );
        }
    });
    
    b.bundle(function (err, src) {
        var c = {
            times : 0,
            t : t
        };
        vm.runInNewContext(src, c);
    });
});
