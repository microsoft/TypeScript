//// [tests/cases/compiler/typeParametersInStaticAccessors.ts] ////

//// [typeParametersInStaticAccessors.ts]
class foo<T> {
    static get Foo(): () => T { return null; }
    static set Bar(v: { v: T }) { }
} 

//// [typeParametersInStaticAccessors.js]
var foo = /** @class */ (function () {
    function foo() {
    }
    Object.defineProperty(foo, "Foo", {
        get: function () { return null; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(foo, "Bar", {
        set: function (v) { },
        enumerable: false,
        configurable: true
    });
    return foo;
}());
