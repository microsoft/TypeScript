var test = require('tape');
var defined = require('../');

test('falsy', function (t) {
    t.plan(1);
    var opts = { y : false, w : 4 };
    var x = defined(opts.x, opts.y, opts.w, 8);
    t.equal(x, false);
});
