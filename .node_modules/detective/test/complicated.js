var test = require('tap').test;
var detective = require('../');

var sources = [
    'require("a")',
    "require('a')",
    'require(`a`)',
    ';require("a")',
    ' require("a")',
    'void require("a")',
    '+require("a")',
    '!require("a")',
    '/*comments*/require("a")',
    '(require("a"))',

    'require/*comments*/("a")',
    ';require/*comments*/("a")',
    ' require/*comments*/("a")',
    'void require/*comments*/("a")',
    '+require/*comments*/("a")',
    '!require/*comments*/("a")',
    '/*comments*/require/*comments*/("a")',
    '(require/*comments*/("a"))',

    'require /*comments*/ ("a")',
    ';require /*comments*/ ("a")',
    ' require /*comments*/ ("a")',
    'void require /*comments*/ ("a")',
    '+require /*comments*/ ("a")',
    '!require /*comments*/ ("a")',
    ' /*comments*/ require /*comments*/ ("a")',
    '(require /*comments*/ ("a"))',

    'require /*comments*/ /*more comments*/ ("a")',
    ';require /*comments*/ /*more comments*/ ("a")',
    ' require /*comments*/ /*more comments*/ ("a")',
    'void require /*comments*/ /*more comments*/ ("a")',
    '+require /*comments*/ /*more comments*/ ("a")',
    '!require /*comments*/ /*more comments*/ ("a")',
    ' /*comments*/ /*more comments*/ require /*comments*/ /*more comments*/ ("a")',
    '(require /*comments*/ /*more comments*/ ("a"))',

    'require//comments\n("a")',
    ';require//comments\n("a")',
    ' require//comments\n("a")',
    'void require//comments\n("a")',
    '+require//comments\n("a")',
    '!require//comments\n("a")',
    '  require//comments\n("a")',
    '(require//comments\n("a"))'
];

test('complicated', function (t) {
    t.plan(sources.length);
    sources.forEach(function(src) {
        t.deepEqual(detective(src), [ 'a' ]);
    });
});
