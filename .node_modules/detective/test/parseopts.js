var test = require('tap').test;
var detective = require('../');
var fs = require('fs');
var src = fs.readFileSync(__dirname + '/files/both.js');

test('nodes specified in opts and parseopts { range: true }', function (t) {
    var modules = detective.find(src, { nodes: true, parse: { range: true } });
    t.deepEqual(modules.strings, [ 'a', 'b' ]);
    t.deepEqual(modules.expressions, [ "'c' + x", "'d' + y" ]);
    t.deepEqual(
      modules.nodes.map(function (n) { 
        var arg = n.arguments[0];
        return arg.value || arg.left.value; 
      }),
      [ 'a', 'b', 'c', 'd' ],
      'has a node for each require');

    var range = modules.nodes[0].range;
    t.equal(range[0], 0, 'includes range start');
    t.equal(range[1], 12, 'includes range end');
    t.end();
});

test('nodes specified in opts and parseopts { range: false }', function (t) {
    var modules = detective.find(src, { nodes: true, parse: { range: false } });
    t.deepEqual(modules.strings, [ 'a', 'b' ]);
    t.deepEqual(modules.expressions, [ "'c' + x", "'d' + y" ]);
    t.deepEqual(
      modules.nodes.map(function (n) { 
        var arg = n.arguments[0];
        return arg.value || arg.left.value; 
      }),
      [ 'a', 'b', 'c', 'd' ],
      'has a node for each require');

    t.notOk(modules.nodes[0].range, 'includes no ranges');
    t.end();
});

test('nodes specified in opts and parseopts { range: true, loc: true }', function (t) {
    var modules = detective.find(src, { nodes: true, parse: { range: true, loc: true } });
    t.deepEqual(modules.strings, [ 'a', 'b' ]);
    t.deepEqual(modules.expressions, [ "'c' + x", "'d' + y" ]);
    t.deepEqual(
      modules.nodes.map(function (n) { 
        var arg = n.arguments[0];
        return arg.value || arg.left.value; 
      }),
      [ 'a', 'b', 'c', 'd' ],
      'has a node for each require');

    var range = modules.nodes[0].range;
    t.equal(range[0], 0, 'includes range start');
    t.equal(range[1], 12, 'includes range end');

    var loc = modules.nodes[0].loc;
    t.equal(loc.start.line, 1, 'includes start line');
    t.equal(loc.start.column, 0, 'includes start column');
    t.equal(loc.end.line, 1, 'includes end line');
    t.equal(loc.end.column, 12, 'includes end column');
    t.end();
});
