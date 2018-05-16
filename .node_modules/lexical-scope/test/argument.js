var test = require('tape');
var detect = require('../');
var fs = require('fs');
var src = fs.readFileSync(__dirname + '/files/argument.js');

test('parameters from inline arguments', function (t) {
    t.plan(3);
    
    var scope = detect(src);
    t.same(scope.globals.implicit, []);
    t.same(scope.globals.exported, []);
    t.same(scope.locals, {
        'body.0': [ 'a' ],
        '': [ 'foo' ],
        'body.0.body.body.1.argument': [ 'c' ]
    });
});
