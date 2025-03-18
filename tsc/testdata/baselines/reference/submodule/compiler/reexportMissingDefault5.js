//// [tests/cases/compiler/reexportMissingDefault5.ts] ////

//// [b.d.ts]
declare var b: number;
export { b };

//// [a.ts]
export { b } from "./b";
export { default as Foo } from "./b";

//// [a.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Foo = exports.b = void 0;
const b_1 = require("./b");
Object.defineProperty(exports, "b", { enumerable: true, get: function () { return b_1.b; } });
const b_2 = require("./b");
Object.defineProperty(exports, "Foo", { enumerable: true, get: function () { return b_2.default; } });
