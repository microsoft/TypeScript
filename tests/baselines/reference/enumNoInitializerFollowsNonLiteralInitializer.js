//// [tests/cases/compiler/enumNoInitializerFollowsNonLiteralInitializer.ts] ////

//// [helpers.ts]
export const foo = 2;

//// [bad.ts]
import { foo } from "./helpers";
enum A {
    a = foo,
    b,
}

//// [good.ts]
import { foo } from "./helpers";
enum A {
    a = foo,
    b = 3,
}
enum B {
    a = 1 + 1,
    b,
}
enum C {
    a = +2,
    b,
}
enum D {
    a = (2),
    b,
}


//// [helpers.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.foo = void 0;
exports.foo = 2;
//// [bad.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var helpers_1 = require("./helpers");
var A;
(function (A) {
    A[A["a"] = 2] = "a";
    A[A["b"] = 3] = "b";
})(A || (A = {}));
//// [good.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var helpers_1 = require("./helpers");
var A;
(function (A) {
    A[A["a"] = 2] = "a";
    A[A["b"] = 3] = "b";
})(A || (A = {}));
var B;
(function (B) {
    B[B["a"] = 2] = "a";
    B[B["b"] = 3] = "b";
})(B || (B = {}));
var C;
(function (C) {
    C[C["a"] = 2] = "a";
    C[C["b"] = 3] = "b";
})(C || (C = {}));
var D;
(function (D) {
    D[D["a"] = 2] = "a";
    D[D["b"] = 3] = "b";
})(D || (D = {}));
