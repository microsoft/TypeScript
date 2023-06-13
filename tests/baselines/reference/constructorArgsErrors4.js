//// [tests/cases/compiler/constructorArgsErrors4.ts] ////

//// [constructorArgsErrors4.ts]
class foo {
    constructor (private public a: number) {
    }
}


//// [constructorArgsErrors4.js]
var foo = /** @class */ (function () {
    function foo(a) {
        this.a = a;
    }
    return foo;
}());
