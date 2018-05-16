var sort = require('../');
var test = require('tap').test;
var through = require('through2');

test('indexed', function (t) {
    t.plan(1);
    var s = sort({ index: true });
    var rows = [];
    function write (row, enc, next) { rows.push(row); next() }
    function end () {
        t.deepEqual(rows, [
            {
                id: '/bar.js',
                deps: {},
                index: 1,
                indexDeps: {}
            },
            {
                id: '/foo.js',
                deps: { './bar': '/bar.js' },
                index: 2,
                indexDeps: { './bar': 1 }
            },
            {
                id: '/main.js',
                deps: { './foo': '/foo.js' },
                index: 3,
                indexDeps: { './foo': 2 }
            },
        ]);
    }
    s.pipe(through.obj(write, end));
    
    s.write({ id: '/main.js', deps: { './foo': '/foo.js' } });
    s.write({ id: '/foo.js', deps: { './bar': '/bar.js' } });
    s.write({ id: '/bar.js', deps: {} });
    s.end();
});
