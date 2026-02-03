//// [tests/cases/compiler/constructorArgsErrors5.ts] ////

//// [constructorArgsErrors5.ts]
class foo {
    constructor (export a: number) {
    }
}


//// [constructorArgsErrors5.js]
var foo = /** @class */ (function () {
    function foo(a) {
    }
    return foo;
}());
