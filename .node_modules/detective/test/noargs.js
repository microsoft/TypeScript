var test = require('tap').test;
var detective = require('../');
var fs = require('fs');

// in order to use detective to find any function
// it needs to properly handle functions called without args
var src = [ 'fn();', 'otherfn();', 'fn();' ].join('\n')

test('noargs', function (t) {
    t.plan(1);
    t.deepEqual(detective(src, { word: 'fn' }).length, 0, 'finds no arg id');
});

test('find noargs with nodes', function (t) {
    t.plan(4);
    var modules = detective.find(src, { word: 'fn', nodes: true });
    t.equal(modules.strings.length, 0, 'finds no arg id');
    t.equal(modules.expressions.length, 0, 'finds no expressions');
    t.equal(modules.nodes.length, 2, 'finds a node for each matching function call');
    t.equal(
      modules.nodes.filter(function (x) { 
        return x.callee.name === 'fn' 
      }).length, 2, 
      'all matches are correct'
    );
});
