var parser = require('../');
var through = require('through2');
var test = require('tap').test;
var fs = require('fs');
var path = require('path');

var files = {
    transformdeps: path.join(__dirname, '/files/transformdeps.js'),
    foo: path.join(__dirname, '/files/foo.js'),
    bar: path.join(__dirname, '/files/bar.js')
};

var sources = Object.keys(files).reduce(function (acc, file) {
    acc[file] = fs.readFileSync(files[file], 'utf8');
    return acc;
}, {});

test('deps added by transforms', function (t) {
    t.plan(1);
    var p = parser();
    p.write({ transform: transform, options: {} });
    p.end({ file: files.transformdeps, entry: true });
    function transform (file) {
        if (file === files.transformdeps) return through(function(chunk, enc, cb) {
            cb(null, chunk);
        }, function (cb) {
            this.emit('dep', './foo');
            cb();
        });
        return through();
    }
    
    var rows = [];
    p.on('data', function (row) { rows.push(row) });
    p.on('end', function () {
        t.same(rows.sort(cmp), [
            {
                id: files.transformdeps,
                file: files.transformdeps,
                source: sources.transformdeps,
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
