var sort = require('../');
var test = require('tap').test;
var through = require('through2');

test('dedupe-deps-of-deps', function (t) {
    t.plan(1);
    var s = sort({ dedupe: true });
    var rows = [];
    function write (row, enc, next) { rows.push(row); next() }
    function end () {
        t.deepEqual(rows, [
            {
                id: '/bar.js',
                deps: { baz: '/bar/baz.js' },
                source: 'TWO'
            },
            {
                id: '/bar/baz.js',
                deps: {},
                source: 'THREE'
            },
            {
                id: '/foo.js',
                deps: { baz: '/foo/baz.js' },
                source: 'TWO',
                dedupe: '/bar.js',
                sameDeps: true
            },
            {
                id: '/foo/baz.js',
                deps: {},
                source: 'THREE',
                dedupe: '/bar/baz.js',
                sameDeps: true
            },
            {
                id: '/main.js',
                deps: { './foo': '/foo.js', './bar': '/bar.js' },
                source: 'ONE'
            }
        ]);
    }
    s.pipe(through.obj(write, end));
    
    s.write({
        id: '/main.js',
        deps: { './foo': '/foo.js', './bar': '/bar.js' },
        source: 'ONE'
    });
    s.write({
        id: '/foo.js',
        deps: { baz : '/foo/baz.js' },
        source: 'TWO'
    });
    s.write({
        id: '/bar.js',
        deps: { baz : '/bar/baz.js' },
        source: 'TWO'
    });
    s.write({
        id: '/foo/baz.js',
        deps: {},
        source: 'THREE'
    });
    s.write({
        id: '/bar/baz.js',
        deps: {},
        source: 'THREE'
    });
    s.end();
});
