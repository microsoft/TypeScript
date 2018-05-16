var astw = require('../');
var test = require('tape');

test('json', function (t) {
    t.plan(2);
    var numbers = [ 1, 2 ];
    var walk = astw('{"a":1,"b":2}');
    walk(function (node) {
        if (node.type === 'Literal' && typeof node.value === 'number') {
            t.equal(node.value, numbers.shift());
        }
    });
});
