var astw = require('../');
var test = require('tape');
var generate = require('escodegen').generate;

function unparse (s) {
    return generate(s, { format: { compact: true } });
}

test('parent', function (t) {
    t.plan(4);
    
    var walk = astw('(' + function () {
        var xs = [ 1, 2, 3 ];
        fn(ys);
    } + ')()');
    
    walk(function (node) {
        if (node.type === 'ArrayExpression') {
            t.equal(node.parent.type, 'VariableDeclarator');
            t.equal(unparse(node.parent), 'xs=[1,2,3]');
            t.equal(node.parent.parent.type, 'VariableDeclaration');
            t.equal(unparse(node.parent.parent), 'var xs=[1,2,3];');
        }
    });
});
