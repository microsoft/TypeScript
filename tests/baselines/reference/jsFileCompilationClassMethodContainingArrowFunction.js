//// [tests/cases/compiler/jsFileCompilationClassMethodContainingArrowFunction.ts] ////

//// [a.js]
class c {
    method(a) {
        let x = a => this.method(a);
    }
}


//// [out.js]
"use strict";
var c = /** @class */ (function () {
    function c() {
    }
    c.prototype.method = function (a) {
        var _this = this;
        var x = function (a) { return _this.method(a); };
    };
    return c;
}());
