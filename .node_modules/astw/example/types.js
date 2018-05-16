var astw = require('../');
var deparse = require('escodegen').generate;
var walk = astw('4 + beep(5 * 2)');

walk(function (node) {
    var src = deparse(node);
    console.log(node.type + ' :: ' + JSON.stringify(src));
});
