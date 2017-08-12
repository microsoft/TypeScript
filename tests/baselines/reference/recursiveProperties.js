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
    var proto_1 = A.prototype;
    Object.defineProperty(proto_1, "testProp", {
        get: function () { return this.testProp; },
        enumerable: true,
        configurable: true
    });
    return A;
}());
var B = (function () {
    function B() {
    }
    var proto_2 = B.prototype;
    Object.defineProperty(proto_2, "testProp", {
        set: function (value) { this.testProp = value; },
        enumerable: true,
        configurable: true
    });
    return B;
}());
