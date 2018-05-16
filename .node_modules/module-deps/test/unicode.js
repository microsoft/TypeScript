var parser = require('../');
var test = require('tap').test;
var fs = require('fs');
var path = require('path');

var files = {
    main: path.join(__dirname, '/files/unicode/main.js'),
    foo: path.join(__dirname, '/files/unicode/foo.js'),
    bar: path.join(__dirname, '/files/unicode/bar.js')
};

var sources = Object.keys(files).reduce(function (acc, file) {
    acc[file] = fs.readFileSync(files[file], 'utf8');
    return acc;
}, {});

test('unicode deps', function (t) {
    t.plan(1);
    var p = parser();
    p.end(files.main);
    var rows = [];
    
    p.on('data', function (row) { rows.push(row) });
    p.on('end', function () {
        t.same(rows.sort(cmp), [
            {
                id: files.main,
                file: files.main,
                source: sources.main,
                entry: true,
                deps: { './foo': files.foo }
            },
            {
                id: files.foo,
                file: files.foo,
                source: sources.foo,
                deps: { './bar': files.bar }
            },
            {
                id: files.bar,
                file: files.bar,
                source: sources.bar,
                deps: {}
            }
        ].sort(cmp));
    });
});

function cmp (a, b) { return a.id < b.id ? -1 : 1 }
