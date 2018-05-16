var test = require('tap').test;

var fs = require('fs');
var check = require('../');

var src = '<html></html>';

test('html', function (t) {
    var err = check(src, 'foo.js');
    t.ok(err);
    t.equal(err.line, 1);
    t.equal(err.column, 1);
    t.equal(err.message, 'Unexpected token');
    t.ok(/foo.js:1/.test(err), 'foo.js:1');
    t.end();
});
