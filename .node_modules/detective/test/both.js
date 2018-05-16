var test = require('tap').test;
var detective = require('../');
var fs = require('fs');
var src = fs.readFileSync(__dirname + '/files/both.js');

test('both', function (t) {
    var modules = detective.find(src);
    t.deepEqual(modules.strings, [ 'a', 'b' ]);
    t.deepEqual(modules.expressions, [ "'c' + x", "'d' + y" ]);
    t.notOk(modules.nodes, 'has no nodes');
    t.end();
});

test('both with nodes specified in opts', function (t) {
    var modules = detective.find(src, { nodes: true });
    t.deepEqual(modules.strings, [ 'a', 'b' ]);
    t.deepEqual(modules.expressions, [ "'c' + x", "'d' + y" ]);
    t.deepEqual(
      modules.nodes.map(function (n) { 
        var arg = n.arguments[0];
        return arg.value || arg.left.value; 
      }),
      [ 'a', 'b', 'c', 'd' ],
      'has a node for each require');
    t.end();
});
