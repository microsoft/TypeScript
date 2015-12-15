//// [staticGetterAndSetter.ts]
class Foo {
    static get Foo():number { return 0; }
    static set Foo(n: number) {}
}


//// [staticGetterAndSetter.js]
var Foo = (function () {
    function Foo() {
    }
    Object.defineProperty(Foo, "Foo", {
        get: function () { return 0; },
        set: function (n) { },
        enumerable: true,
        configurable: true
    });
    return Foo;
}());
