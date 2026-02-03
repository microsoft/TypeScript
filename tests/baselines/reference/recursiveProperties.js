//// [tests/cases/compiler/recursiveProperties.ts] ////

//// [recursiveProperties.ts]
class A {
    get testProp() { return this.testProp; }
}

class B {
    set testProp(value:string) { this.testProp = value; }
}

//// [recursiveProperties.js]
var A = /** @class */ (function () {
    function A() {
    }
    Object.defineProperty(A.prototype, "testProp", {
        get: function () { return this.testProp; },
        enumerable: false,
        configurable: true
    });
    return A;
}());
var B = /** @class */ (function () {
    function B() {
    }
    Object.defineProperty(B.prototype, "testProp", {
        set: function (value) { this.testProp = value; },
        enumerable: false,
        configurable: true
    });
    return B;
}());
