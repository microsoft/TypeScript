var defined = require('../');
var test = require('tape');

test('defined-or', function (t) {
    var u = undefined;
    
    t.equal(defined(), u, 'empty arguments');
    t.equal(defined(u), u, '1 undefined');
    t.equal(defined(u, u), u, '2 undefined');
    t.equal(defined(u, u, u, u), u, '4 undefineds');
    
    t.equal(defined(undefined, false, true), false, 'false[0]');
    t.equal(defined(false, true), false, 'false[1]');
    t.equal(defined(undefined, 0, true), 0, 'zero[0]');
    t.equal(defined(0, true), 0, 'zero[1]');
    
    t.equal(defined(3, undefined, 4), 3, 'first arg');
    t.equal(defined(undefined, 3, 4), 3, 'second arg');
    t.equal(defined(undefined, undefined, 3), 3, 'third arg');
    
    t.end();
});
