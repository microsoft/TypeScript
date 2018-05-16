var mdeps = require('../');
var test = require('tap').test;
var path = require('path');
var through = require('through2');

var files = {
    foo: path.join(__dirname, '/files/foo.js'),
    bar: path.join(__dirname, '/files/bar.js')
};

var sources = {
    foo: 'require("./bar"); var tongs;',
    bar: 'notreal tongs'
};

var fileCache = {};
fileCache[files.foo] = sources.foo;
fileCache[files.bar] = sources.bar;

var specialReplace = function(input) {
    return input.replace(/tongs/g, 'tangs');
};

test('uses file cache', function (t) {
    t.plan(1);
    var p = mdeps({
        fileCache: fileCache,
        transform: function (file) {
            return through(function (buf, enc, next) {
                this.push(specialReplace(String(buf)));
                next();
            });
        },
        transformKey: [ 'browserify', 'transform' ]
    });
    p.end({ id: 'foo', file: files.foo, entry: false });

    var rows = [];
    p.on('data', function (row) { rows.push(row) });
    p.on('end', function () {
        t.same(rows.sort(cmp), [
            {
                id: 'foo',
                file: files.foo,
                source: specialReplace(sources.foo),
                deps: { './bar': files.bar }
            },
            {
                id: files.bar,
                file: files.bar,
                source: specialReplace(sources.bar),
                deps: {}
            }
        ].sort(cmp));
    });
});

function cmp (a, b) { return a.id < b.id ? -1 : 1 }
