//// [computedPropertyNames37_ES5.ts]
class Foo { x }
class Foo2 { x; y }

class C {
    [s: number]: Foo2;

    // Computed properties
    get ["get1"]() { return new Foo }
    set ["set1"](p: Foo2) { }
}

//// [computedPropertyNames37_ES5.js]
var Foo = /** @class */ (function () {
    function Foo() {
    }
    return Foo;
}());
var Foo2 = /** @class */ (function () {
    function Foo2() {
    }
    return Foo2;
}());
var C = /** @class */ (function () {
    function C() {
    }
    Object.defineProperty(C.prototype, "get1", {
        // Computed properties
        get: function () { return new Foo; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(C.prototype, "set1", {
        set: function (p) { },
        enumerable: false,
        configurable: true
    });
    return C;
}());
