//// [constructorArgsErrors1.ts]
class foo {
    constructor (static a: number) {
    }
}

//// [constructorArgsErrors1.js]
var foo = (function () {
    function foo(a) {
    }
    return foo;
}());
