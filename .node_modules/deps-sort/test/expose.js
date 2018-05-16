var sort = require('../');
var test = require('tap').test;
var through = require('through2');

test('expose true', function (t) {
    t.plan(1);
    var s = sort({ index: true, expose: [ '/foo.js', '/bar.js' ] });
    var rows = [];
    function write (row, enc, next) { rows.push(row); next() }
    function end () {
        t.deepEqual(rows, [
            {
                id: '/bar.js',
                deps: {},
                index: '/bar.js',
                indexDeps: {}
            },
            {
                id: '/foo.js',
                deps: { './bar': '/bar.js' },
                index: '/foo.js',
                indexDeps: { './bar': '/bar.js' }
            },
            {
                id: '/main.js',
                deps: { './foo': '/foo.js' },
                index: 1,
                indexDeps: { './foo': '/foo.js' }
            },
        ]);
    }
    s.pipe(through.obj(write, end));
    
    s.write({ id: '/main.js', deps: { './foo': '/foo.js' } });
    s.write({ id: '/foo.js', deps: { './bar': '/bar.js' } });
    s.write({ id: '/bar.js', deps: {} });
    s.end();
});
