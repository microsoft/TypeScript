//// [constructorArgsErrors5.ts]
class foo {
    constructor (export a: number) {
    }
}


//// [constructorArgsErrors5.js]
var foo = (function () {
    function foo(export a) {
    }
    return foo;
}());
