var test = require('tape');
var detect = require('../');
var fs = require('fs');
var src = fs.readFileSync(__dirname + '/files/obj.js');

test('globals on the right-hand of a colon in an object literal', function (t) {
    t.plan(3);
    
    var scope = detect(src);
    t.same(
        scope.globals.implicit.sort(),
        [ 'bar', 'module' ].sort()
    );
    t.same(scope.globals.exported, []);
    t.same(scope.locals, { '': [] });
});
