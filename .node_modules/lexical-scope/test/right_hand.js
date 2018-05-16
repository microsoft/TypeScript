var test = require('tape');
var detect = require('../');
var fs = require('fs');
var src = fs.readFileSync(__dirname + '/files/right_hand.js');

test('globals on the right-hand of assignment', function (t) {
    t.plan(3);
    
    var scope = detect(src);
    t.same(
        scope.globals.implicit.sort(),
        [ 'exports', '__dirname', '__filename' ].sort()
    );
    t.same(scope.globals.exported, []);
    t.same(scope.locals, { '': [] });
});
