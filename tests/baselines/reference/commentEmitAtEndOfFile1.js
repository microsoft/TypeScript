//// [tests/cases/compiler/commentEmitAtEndOfFile1.ts] ////

//// [commentEmitAtEndOfFile1.ts]
// test
var f = ''
// test #2
namespace foo {
        function bar() { }
}
// test #3
namespace empty {
}
// test #4

//// [commentEmitAtEndOfFile1.js]
// test
var f = '';
// test #2
var foo;
(function (foo) {
    function bar() { }
})(foo || (foo = {}));
// test #4
