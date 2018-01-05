//// [constructorArgsErrors1.ts]
class foo {
    constructor (static a: number) {
    }
}

//// [constructorArgsErrors1.js]
var foo = /** @class */ (function () {
    function foo(a) {
    }
    return foo;
}());
