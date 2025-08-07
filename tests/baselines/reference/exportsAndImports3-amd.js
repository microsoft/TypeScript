//// [tests/cases/conformance/es6/modules/exportsAndImports3-amd.ts] ////

//// [t1.ts]
export var v = 1;
export function f() { }
export class C {
}
export interface I {
}
export enum E {
    A, B, C
}
export const enum D {
    A, B, C
}
export module M {
    export var x;
}
export module N {
    export interface I {
    }
}
export type T = number;
export import a = M.x;

export { v as v1, f as f1, C as C1, I as I1, E as E1, D as D1, M as M1, N as N1, T as T1, a as a1 };

//// [t2.ts]
export { v1 as v, f1 as f, C1 as C, I1 as I, E1 as E, D1 as D, M1 as M, N1 as N, T1 as T, a1 as a } from "./t1";

//// [t3.ts]
import { v1 as v, f1 as f, C1 as C, I1 as I, E1 as E, D1 as D, M1 as M, N1 as N, T1 as T, a1 as a } from "./t1";
export { v, f, C, I, E, D, M, N, T, a };


//// [t1.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.a1 = exports.M1 = exports.E1 = exports.C1 = exports.v1 = exports.a = exports.M = exports.E = exports.C = exports.v = void 0;
    exports.f = f;
    exports.f1 = f;
    exports.v = 1;
    exports.v1 = exports.v;
    function f() { }
    var C = /** @class */ (function () {
        function C() {
        }
        return C;
    }());
    exports.C = C;
    exports.C1 = C;
    var E;
    (function (E) {
        E[E["A"] = 0] = "A";
        E[E["B"] = 1] = "B";
        E[E["C"] = 2] = "C";
    })(E || (exports.E1 = exports.E = E = {}));
    var M;
    (function (M) {
    })(M || (exports.M1 = exports.M = M = {}));
    exports.a = M.x;
    exports.a1 = exports.a;
});
//// [t2.js]
define(["require", "exports", "./t1"], function (require, exports, t1_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.a = exports.M = exports.E = exports.C = exports.f = exports.v = void 0;
    Object.defineProperty(exports, "v", { enumerable: true, get: function () { return t1_1.v1; } });
    Object.defineProperty(exports, "f", { enumerable: true, get: function () { return t1_1.f1; } });
    Object.defineProperty(exports, "C", { enumerable: true, get: function () { return t1_1.C1; } });
    Object.defineProperty(exports, "E", { enumerable: true, get: function () { return t1_1.E1; } });
    Object.defineProperty(exports, "M", { enumerable: true, get: function () { return t1_1.M1; } });
    Object.defineProperty(exports, "a", { enumerable: true, get: function () { return t1_1.a1; } });
});
//// [t3.js]
define(["require", "exports", "./t1"], function (require, exports, t1_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.a = exports.M = exports.E = exports.C = exports.f = exports.v = void 0;
    Object.defineProperty(exports, "v", { enumerable: true, get: function () { return t1_1.v1; } });
    Object.defineProperty(exports, "f", { enumerable: true, get: function () { return t1_1.f1; } });
    Object.defineProperty(exports, "C", { enumerable: true, get: function () { return t1_1.C1; } });
    Object.defineProperty(exports, "E", { enumerable: true, get: function () { return t1_1.E1; } });
    Object.defineProperty(exports, "M", { enumerable: true, get: function () { return t1_1.M1; } });
    Object.defineProperty(exports, "a", { enumerable: true, get: function () { return t1_1.a1; } });
});
