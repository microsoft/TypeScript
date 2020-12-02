//// [computedPropertyNames21_ES5.ts]
class C {
    bar() {
        return 0;
    }
    [this.bar()]() { }
}

//// [computedPropertyNames21_ES5.js]
var C = /** @class */ (function () {
    function C() {
    }
    var C_prototype = C.prototype;
    C_prototype.bar = function () {
        return 0;
    };
    C_prototype[this.bar()] = function () { };
    return C;
}());
