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
    C.prototype.bar = function () {
        return 0;
    };
    C.prototype[(_a = {}, _a[this.bar()] = 1, _a)[0]] = function () { };
    return C;
}());
