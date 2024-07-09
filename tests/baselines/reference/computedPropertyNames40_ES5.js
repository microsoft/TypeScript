//// [tests/cases/conformance/es6/computedProperties/computedPropertyNames40_ES5.ts] ////

//// [computedPropertyNames40_ES5.ts]
class Foo { x }
class Foo2 { x; y }

class C {
    [s: string]: () => Foo2;

    // Computed properties
    [""]() { return new Foo }
    [""]() { return new Foo2 }
}

//// [computedPropertyNames40_ES5.js]
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
    // Computed properties
    C.prototype[""] = function () { return new Foo; };
    C.prototype[""] = function () { return new Foo2; };
    return C;
}());
