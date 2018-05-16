var sort = require('../');
var test = require('tap').test;
var through = require('through2');

test('dedupe', function (t) {
    t.plan(1);
    var s = sort({ dedupe: true });
    var rows = [];
    function write (row, enc, next) { rows.push(row); next() }
    function end () {
        t.deepEqual(rows, [
            { id: '/bar.js', deps: {}, source: 'TWO' },
            { id: '/foo.js', deps: {}, source: 'TWO', dedupe: '/bar.js', sameDeps: true },
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
        deps: {},
        source: 'TWO'
    });
    s.write({
        id: '/bar.js',
        deps: {},
        source: 'TWO'
    });
    s.end();
});
