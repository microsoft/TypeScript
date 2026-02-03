//// [tests/cases/compiler/thisShadowingErrorSpans.ts] ////

//// [thisShadowingErrorSpans.ts]
class C {
    m() {
        this.m();
        function f() {
            this.m();
        }
    }
}


//// [thisShadowingErrorSpans.js]
"use strict";
var C = /** @class */ (function () {
    function C() {
    }
    C.prototype.m = function () {
        this.m();
        function f() {
            this.m();
        }
    };
    return C;
}());
