//// [recursiveProperties.ts]
class A {
    get testProp() { return this.testProp; }
}

class B {
    set testProp(value:string) { this.testProp = value; }
}

//// [recursiveProperties.js]
var A = (function () {
    function A() {
    }
    Object.defineProperty(A.prototype, "testProp", {
        get: function () { return this.testProp; },
        enumerable: true,
        configurable: true
    });
    return A;
}());
var B = (function () {
    function B() {
    }
    Object.defineProperty(B.prototype, "testProp", {
        set: function (value) { this.testProp = value; },
        enumerable: true,
        configurable: true
    });
    return B;
}());
