//// [tests/cases/compiler/thisInConstructorParameter3.ts] ////

//// [thisInConstructorParameter3.ts]
class C {
    constructor(cb = (a: { }) => this.m(a)) {
        cb({ });
    }

    private m(a: any): boolean {
        a;
        return true;
    }
}


//// [thisInConstructorParameter3.js]
var C = /** @class */ (function () {
    function C(cb) {
        var _this = this;
        if (cb === void 0) { cb = function (a) { return _this.m(a); }; }
        cb({});
    }
    C.prototype.m = function (a) {
        a;
        return true;
    };
    return C;
}());
