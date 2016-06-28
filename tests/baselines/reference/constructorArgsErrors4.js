//// [constructorArgsErrors4.ts]
class foo {
    constructor (private public a: number) {
    }
}


//// [constructorArgsErrors4.js]
var foo = (function () {
    function foo(a) {
        this.a = a;
    }
    return foo;
}());
