var test = require('tap').test;
var detective = require('../');
var fs = require('fs');
var src = fs.readFileSync(__dirname + '/files/isrequire.js');

test('word', function (t) {
    t.deepEqual(
        detective(src, { isRequire: function(node) {
          return (node.type === 'CallExpression' &&
              node.callee.type === 'MemberExpression' &&
              node.callee.object.type == 'Identifier' &&
              node.callee.object.name == 'require' &&
              node.callee.property.type == 'Identifier' &&
              node.callee.property.name == 'async')
        } }),
        [ 'a', 'b', 'c', 'events', 'doom', 'y', 'events2' ]
    );
    t.end();
});

