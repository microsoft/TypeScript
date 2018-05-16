
var test = require('tape');
var detect = require('../');
var fs = require('fs');
var src = fs.readFileSync(__dirname + '/files/multiple-exports.js');

test('multiple-exports', function (t) {
    t.plan(3);
    
    var scope = detect(src);
    t.same(scope.globals.implicit.sort(), ['bar', 'exports'].sort());
    t.same(scope.globals.exported, []);
    t.same(scope.locals,  {
      '':[],
      'body.1.expression.right': ['bar'],
      'body.0.expression.right': []
    });
});
