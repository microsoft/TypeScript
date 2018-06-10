//// [computedPropertyNames22_ES5.ts]
class C {
    bar() {
        var obj = {
            [this.bar()]() { }
        };
        return 0;
    }
}

//// [computedPropertyNames22_ES5.js]
var C = /** @class */ (function () {
    function C() {
    }
    C.prototype.bar = function () {
        var _a;
        var obj = (_a = {},
            _a[this.bar()] = function () { },
            _a);
        return 0;
    };
    return C;
}());
