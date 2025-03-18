//// [tests/cases/compiler/enumWithNonLiteralStringInitializer.ts] ////

//// [helpers.ts]
export const foo = 2;
export const bar = "bar";

//// [bad.ts]
import { bar } from "./helpers";
enum A {
   a = bar,
}

//// [good.ts]
import { foo } from "./helpers";
enum A {
   a = `${foo}`,
   b = "" + 2,
   c = 2 + "",
   d = ("foo"),
}


//// [helpers.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bar = exports.foo = void 0;
exports.foo = 2;
exports.bar = "bar";
//// [bad.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("./helpers");
var A;
(function (A) {
    A["a"] = helpers_1.bar;
    if (typeof A.a !== "string") A[A.a] = "a";
})(A || (A = {}));
//// [good.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("./helpers");
var A;
(function (A) {
    A["a"] = `${helpers_1.foo}`;
    if (typeof A.a !== "string") A[A.a] = "a";
    A["b"] = "2";
    A["c"] = "2";
    A["d"] = "foo";
})(A || (A = {}));
