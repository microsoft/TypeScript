var test = require('tape');
var stringify = require('../');

test('simple object', function (t) {
    t.plan(1);
    var obj = { c: 6, b: [4,5], a: 3, z: null };
    t.equal(stringify(obj), '{"a":3,"b":[4,5],"c":6,"z":null}');
});
