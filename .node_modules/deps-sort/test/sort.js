var sort = require('../');
var test = require('tap').test;
var through = require('through2');

test('sort', function (t) {
    t.plan(1);
    var s = sort();
    var rows = [];
    function write (row, enc, next) { rows.push(row); next() }
    function end () {
        t.deepEqual(rows, [
            { id: '/bar.js', deps: {} },
            { id: '/foo.js', deps: { './bar': '/bar.js' } },
            { id: '/main.js', deps: { './foo': '/foo.js' } }
        ]);
    }
    s.pipe(through.obj(write, end));
    
    s.write({ id: '/main.js', deps: { './foo': '/foo.js' } });
    s.write({ id: '/foo.js', deps: { './bar': '/bar.js' } });
    s.write({ id: '/bar.js', deps: {} });
    s.end();
});
