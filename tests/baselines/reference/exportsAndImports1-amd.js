//// [tests/cases/conformance/es6/modules/exportsAndImports1-amd.ts] ////

//// [t1.ts]
var v = 1;
function f() { }
class C {
}
interface I {
}
enum E {
    A, B, C
}
const enum D {
    A, B, C
}
module M {
    export var x;
}
module N {
    export interface I {
    }
}
type T = number;
import a = M.x;

export { v, f, C, I, E, D, M, N, T, a };

//// [t2.ts]
export { v, f, C, I, E, D, M, N, T, a } from "./t1";

//// [t3.ts]
import { v, f, C, I, E, D, M, N, T, a } from "./t1";
export { v, f, C, I, E, D, M, N, T, a };


//// [t1.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.a = exports.M = exports.E = exports.C = exports.f = exports.v = void 0;
    var v = 1;
    exports.v = v;
    function f() { }
    exports.f = f;
    var C = /** @class */ (function () {
        function C() {
        }
        return C;
    }());
    exports.C = C;
    var E;
    (function (E) {
        E[E["A"] = 0] = "A";
        E[E["B"] = 1] = "B";
        E[E["C"] = 2] = "C";
    })(E || (E = {}));
    exports.E = E;
    var M;
    (function (M) {
    })(M || (M = {}));
    exports.M = M;
    var a = M.x;
    exports.a = a;
});
//// [t2.js]
define(["require", "exports", "./t1"], function (require, exports, t1_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.a = exports.M = exports.E = exports.C = exports.f = exports.v = void 0;
    Object.defineProperty(exports, "v", { enumerable: true, get: function () { return t1_1.v; } });
    Object.defineProperty(exports, "f", { enumerable: true, get: function () { return t1_1.f; } });
    Object.defineProperty(exports, "C", { enumerable: true, get: function () { return t1_1.C; } });
    Object.defineProperty(exports, "E", { enumerable: true, get: function () { return t1_1.E; } });
    Object.defineProperty(exports, "M", { enumerable: true, get: function () { return t1_1.M; } });
    Object.defineProperty(exports, "a", { enumerable: true, get: function () { return t1_1.a; } });
});
//// [t3.js]
define(["require", "exports", "./t1"], function (require, exports, t1_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.a = exports.M = exports.E = exports.C = exports.f = exports.v = void 0;
    Object.defineProperty(exports, "v", { enumerable: true, get: function () { return t1_1.v; } });
    Object.defineProperty(exports, "f", { enumerable: true, get: function () { return t1_1.f; } });
    Object.defineProperty(exports, "C", { enumerable: true, get: function () { return t1_1.C; } });
    Object.defineProperty(exports, "E", { enumerable: true, get: function () { return t1_1.E; } });
    Object.defineProperty(exports, "M", { enumerable: true, get: function () { return t1_1.M; } });
    Object.defineProperty(exports, "a", { enumerable: true, get: function () { return t1_1.a; } });
});
