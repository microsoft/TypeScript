//// [constructorArgsErrors2.ts]
class foo {
    constructor (public static a: number) {
    }
}


//// [constructorArgsErrors2.js]
var foo = /** @class */ (function () {
    function foo(a) {
        this.a = a;
    }
    return foo;
}());
