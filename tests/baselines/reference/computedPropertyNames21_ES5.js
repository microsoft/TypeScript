//// [computedPropertyNames21_ES5.ts]
class C {
    bar() {
        return 0;
    }
    [this.bar()]() { }
}

//// [computedPropertyNames21_ES5.js]
var C = (function () {
    function C() {
    }
    var proto_1 = C.prototype;
    proto_1.bar = function () {
        return 0;
    };
    proto_1[this.bar()] = function () { };
    return C;
}());
