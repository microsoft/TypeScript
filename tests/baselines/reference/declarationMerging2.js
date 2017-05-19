//// [tests/cases/compiler/declarationMerging2.ts] ////

//// [a.ts]
export class A {
    protected _f: number;
    getF() { return this._f; }
}

//// [b.ts]
export {}
declare module "./a" {
    interface A {
        run();
    }
}

//// [a.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var A = (function () {
        function A() {
        }
        A.prototype.getF = function () { return this._f; };
        return A;
    }());
    exports.A = A;
});
//// [b.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
});
