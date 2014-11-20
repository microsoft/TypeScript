//// [thisInConstructorParameter1.ts]
class Foo {
    public y;
    constructor(x = this.y) { }
}

//// [thisInConstructorParameter1.js]
var Foo = (function () {
    function Foo() {
        var x = (arguments[0] === void 0) ? this.y : arguments[0];
    }
    return Foo;
})();
