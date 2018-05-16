var test = require('tape');
var detect = require('../');
var fs = require('fs');
var src = fs.readFileSync(__dirname + '/files/assign_implicit.js');

test('assign from an implicit global', function (t) {
    t.plan(3);
    
    var scope = detect(src);
    t.same(scope.globals.implicit, [ 'bar' ]);
    t.same(scope.globals.exported, []);
    t.same(scope.locals, { '': [ 'foo' ] });
});
