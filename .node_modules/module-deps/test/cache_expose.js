var parser = require('../');
var test = require('tap').test;
var path = require('path');

var files = {
    foo: path.join(__dirname, '/files/foo.js'),
    bar: path.join(__dirname, '/files/bar.js')
};

var sources = {
    foo: 'notreal foo',
    bar: 'notreal bar'
};

var cache = {};
cache[files.foo] = {
    source: sources.foo,
    deps: { './bar': files.bar }
};
cache[files.bar] = {
    source: sources.bar,
    deps: {}
};

test('cache preserves expose and entry', function (t) {
    t.plan(1);
    var p = parser({ cache: cache });
    p.write({ id: files.bar, expose: 'bar2', entry: false });
    p.end({ id: 'foo', file: files.foo, entry: true, expose: 'foo2' });
    
    var rows = [];
    p.on('data', function (row) { rows.push(row) });
    p.on('end', function () {
        t.same(rows.sort(cmp), [
            {
                id: 'foo',
                expose: 'foo2',
                entry: true,
                file: files.foo,
                source: sources.foo,
                deps: { './bar': files.bar }
            },
            {
                id: files.bar,
                expose: 'bar2',
                file: files.bar,
                source: sources.bar,
                deps: {}
            }
        ].sort(cmp));
    });
});

function cmp (a, b) { return a.id < b.id ? -1 : 1 }
