var test = require('tape');
var detect = require('../');
var fs = require('fs');
var src = fs.readFileSync(__dirname + '/files/return_hash.js');

test('return hash', function (t) {
    t.plan(3);
    
    var scope = detect(src);
    t.same(scope.globals.implicit, []);
    t.same(scope.globals.exported, []);
    t.same(scope.locals, { 'body.0': [], '': [ 'foo' ] });
});
