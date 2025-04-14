//// [tests/cases/compiler/reexportMissingDefault2.ts] ////

//// [b.ts]
export const b = null;

//// [a.ts]
export { b } from "./b";
export { default } from "./b";

//// [b.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.b = void 0;
exports.b = null;
//// [a.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = exports.b = void 0;
var b_1 = require("./b");
Object.defineProperty(exports, "b", { enumerable: true, get: function () { return b_1.b; } });
var b_2 = require("./b");
Object.defineProperty(exports, "default", { enumerable: true, get: function () { return b_2.default; } });
