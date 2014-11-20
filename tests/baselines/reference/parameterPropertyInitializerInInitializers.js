//// [parameterPropertyInitializerInInitializers.ts]
class Foo {
    constructor(public x: number, public y: number = x) { }
}

//// [parameterPropertyInitializerInInitializers.js]
var Foo = (function () {
    function Foo(x) {
        var y = (arguments[1] === void 0) ? x : arguments[1];
        this.x = x;
        this.y = y;
    }
    return Foo;
})();
