var parser = require('../');
var test = require('tap').test;
var fs = require('fs');
var path = require('path');
var xtend = require('xtend');

var files = {
    abc: path.join(__dirname, '/expose/lib/abc.js'),
    xyz: path.join(__dirname, '/expose/lib/xyz.js'),
    foo: path.join(__dirname, '/expose/foo.js'),
    bar: path.join(__dirname, '/expose/bar.js'),
    main: path.join(__dirname, '/expose/main.js')
};

var sources = Object.keys(files).reduce(function (acc, file) {
    acc[file] = fs.readFileSync(files[file], 'utf8');
    return acc;
}, {});

var cache = {};
cache[files.abc] = {
    source: sources.abc,
    deps: {}
};
cache[files.xyz] = {
    source: sources.xyz,
    deps: {'../foo': files.foo}
};
cache[files.foo] = {
    source: sources.foo,
    deps: {'./lib/abc': files.abc}
};
cache[files.bar] = {
    source: sources.bar,
    deps: {xyz: files.xyz}
};
cache[files.main] = {
    source: sources.main,
    deps: {
        abc: files.abc,
        xyz: files.xyz,
        './bar': files.bar
    }
};

test('preserves expose and entry with partial cache', function(t) {
    t.plan(1);

    var partialCache = xtend(cache);
    delete partialCache[files.bar];

    var p = parser({ cache: partialCache });
    p.write({ id: 'abc', file: files.abc, expose: 'abc' });
    p.write({ id: 'xyz', file: files.xyz, expose: 'xyz' });
    p.end({ id: 'main', file: files.main, entry: true });

    var rows = [];
    p.on('data', function (row) { rows.push(row); });
    p.on('end', function () {
        t.same(rows.sort(cmp), [
            {
                id: files.bar,
                file: files.bar,
                source: sources.bar,
                deps: {xyz: files.xyz}
            },
            {
                file: files.foo,
                id: files.foo,
                source: sources.foo,
                deps: {'./lib/abc': files.abc}
            },
            {
                id: 'abc',
                file: files.abc,
                source: sources.abc,
                deps: {},
                entry: true,
                expose: 'abc'
            },
            {
                id: 'main',
                file: files.main,
                source: sources.main,
                deps: {
                    './bar': files.bar,
                    abc: files.abc,
                    xyz: files.xyz
                },
                entry: true
            },
            {
                id: 'xyz',
                file: files.xyz,
                source: sources.xyz,
                deps: {'../foo': files.foo},
                entry: true,
                expose: 'xyz'
            }
        ].sort(cmp));
    });
});

function cmp (a, b) { return a.id < b.id ? -1 : 1 }
