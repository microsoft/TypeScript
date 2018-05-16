var test = require('tap').test;
var pack = require('../');

test('raw', function (t) {
    t.plan(1);
    
    var p = pack({ raw: true });
    var src = '';
    p.on('data', function (buf) { src += buf });
    p.on('end', function () {
        var r = Function(['T'], 'return ' + src)(t);
    });
    
    p.write({
        id: 'abc',
        source: 'T.ok(true)',
        entry: true,
    });
    
    p.write({
        id: 'xyz',
        source: 'T.fail("non-entry files should not execute")'
    });
    
    p.end();
});
