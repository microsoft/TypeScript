var sort = require('../');
var test = require('tap').test;
var through = require('through2');

test('expose string', function (t) {
    t.plan(1);
    var s = sort({
        index: true,
        expose: {
            'f': '/foo.js',
            'b': '/bar.js'
        }
    });
    var rows = [];
    function write (row, enc, next) { rows.push(row); next() }
    function end () {
        t.deepEqual(rows, [
            {
                id: '/main.js',
                deps: { './foo': '/foo.js' },
                index: 1,
                indexDeps: { './foo': 'f' }
            },
            {
                id: 'b',
                deps: {},
                index: 'b',
                indexDeps: {}
            },
            {
                id: 'f',
                deps: { './bar': '/bar.js' },
                index: 'f',
                indexDeps: { './bar': 'b' }
            }
        ]);
    }
    s.pipe(through.obj(write, end));
    
    s.write({ id: '/main.js', deps: { './foo': '/foo.js' } });
    s.write({ id: 'f', deps: { './bar': '/bar.js' } });
    s.write({ id: 'b', deps: {} });
    s.end();
});
