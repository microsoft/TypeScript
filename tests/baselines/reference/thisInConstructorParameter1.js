//// [thisInConstructorParameter1.js]
var Foo = (function () {
    function Foo(x) {
        if (typeof x === "undefined") { x = this.y; }
    }
    return Foo;
})();
