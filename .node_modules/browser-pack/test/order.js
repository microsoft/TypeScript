var test = require('tap').test;
var pack = require('../');

test('raw', function (t) {
    t.plan(1);
    
    var p = pack({ raw: true });
    var src = '';
    p.on('data', function (buf) { src += buf });
    p.on('end', function () {
        var order = [];
        var r = Function(['order'], 'return ' + src)(order);
        t.same(order, [ 'abc', 'def', 'hij' ]);
    });
    
    p.write({
        id: 'def',
        order: 1,
        entry: true,
        source: 'order.push("def")'
    });
    
    p.write({
        id: 'hij',
        entry: true,
        order: 2,
        source: 'order.push("hij")'
    });
    
    p.write({
        id: 'abc',
        entry: true,
        order: 0,
        source: 'order.push("abc")'
    });
    
    p.end();
});
