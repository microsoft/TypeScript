//// [computedPropertyNames23_ES5.ts]
class C {
    bar() {
        return 0;
    }
    [
        { [this.bar()]: 1 }[0]
    ]() { }
}

//// [computedPropertyNames23_ES5.js]
var C = /** @class */ (function () {
    var _a;
    function C() {
    }
    var C_prototype = C.prototype;
    C_prototype.bar = function () {
        return 0;
    };
    C_prototype[(_a = {}, _a[this.bar()] = 1, _a)[0]] = function () { };
    return C;
}());
