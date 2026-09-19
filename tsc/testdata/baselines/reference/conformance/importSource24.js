//// [tests/cases/conformance/importSource/importSource24.ts] ////

//// [package.json]
{"type":"commonjs"}

//// [a.ts]
export {};

//// [b.cts]
export const a = import.source("./a.ts");


//// [a.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//// [b.cjs]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.a = void 0;
exports.a = import.source("./a.js");
