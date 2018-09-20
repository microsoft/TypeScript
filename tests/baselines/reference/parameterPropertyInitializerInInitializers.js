//// [parameterPropertyInitializerInInitializers.ts]
class Foo {
    constructor(public x: number, public y: number = x) { }
}

//// [parameterPropertyInitializerInInitializers.js]
var Foo = /** @class */ (function () {
    function Foo(x, y) {
        if (y === void 0) { y = x; }
        this.x = x;
        this.y = y;
    }
    return Foo;
}());
