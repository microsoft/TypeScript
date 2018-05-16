var browserify = require('../');
var vm = require('vm');
var test = require('tap').test;

test('dependency events', function (t) {
    t.plan(4);
    var b = browserify(__dirname + '/entry/main.js');
    var deps = [];
    b.on('dep', function (row) {
        deps.push({ id: row.id, deps: row.deps });
        t.equal(typeof row.source, 'string');
    });
    
    b.bundle(function (err, src) {
        t.deepEqual(deps.sort(cmp), [
            { id: 1, deps: { './one': 2, './two': 3 } },
            { id: 2, deps: {} },
            { id: 3, deps: {} }
        ]);
    });
    
    function cmp (a, b) {
        return a.id < b.id ? -1 : 1;
    }
});
