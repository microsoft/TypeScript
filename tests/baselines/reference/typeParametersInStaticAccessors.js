//// [typeParametersInStaticAccessors.ts]
class foo<T> {
    static get Foo(): () => T { return null; }
    static set Bar(v: { v: T }) { }
} 

//// [typeParametersInStaticAccessors.js]
var foo = (function () {
    function foo() {
    }
    Object.defineProperty(foo, "Foo", {
        get: function () { return null; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(foo, "Bar", {
        set: function (v) { },
        enumerable: true,
        configurable: true
    });
    return foo;
}());
