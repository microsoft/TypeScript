//// [tests/cases/compiler/declarationEmitNameConflicts3.ts] ////

//// [declarationEmitNameConflicts3.ts]
module M {
    export interface D { }
    export module D {
        export function f() { }
    }
    export module C {
        export function f() { }
    }
    export module E {
        export function f() { }
    }
}

module M.P {
    export class C {
        static f() { }
    }
    export class E extends C { }
    export enum D {
        f
    }
    export var v: M.D; // ok
    export var w = M.D.f; // error, should be typeof M.D.f
    export var x = M.C.f; // error, should be typeof M.C.f
    export var x = M.E.f; // error, should be typeof M.E.f
}

//// [declarationEmitNameConflicts3.js]
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var M;
(function (M) {
    var D;
    (function (D) {
        function f() { }
        D.f = f;
    })(D = M.D || (M.D = {}));
    var C;
    (function (C) {
        function f() { }
        C.f = f;
    })(C = M.C || (M.C = {}));
    var E;
    (function (E) {
        function f() { }
        E.f = f;
    })(E = M.E || (M.E = {}));
})(M || (M = {}));
(function (M) {
    var P;
    (function (P) {
        var C = /** @class */ (function () {
            function C() {
            }
            C.f = function () { };
            return C;
        }());
        P.C = C;
        var E = /** @class */ (function (_super) {
            __extends(E, _super);
            function E() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return E;
        }(C));
        P.E = E;
        var D;
        (function (D) {
            D[D["f"] = 0] = "f";
        })(D = P.D || (P.D = {}));
        P.w = M.D.f; // error, should be typeof M.D.f
        P.x = M.C.f; // error, should be typeof M.C.f
        P.x = M.E.f; // error, should be typeof M.E.f
    })(P = M.P || (M.P = {}));
})(M || (M = {}));


//// [declarationEmitNameConflicts3.d.ts]
declare namespace M {
    interface D {
    }
    namespace D {
        function f(): void;
    }
    namespace C {
        function f(): void;
    }
    namespace E {
        function f(): void;
    }
}
declare namespace M.P {
    class C {
        static f(): void;
    }
    class E extends C {
    }
    enum D {
        f = 0
    }
    var v: M.D;
    var w: typeof M.D.f;
    var x: typeof M.C.f;
    var x: typeof M.C.f;
}
