//// [commentEmitAtEndOfFile1.ts]
// test
var f = ''
// test #2
module foo {
        function bar() { }
}
// test #3
module empty {
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
