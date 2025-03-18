//// [tests/cases/compiler/declarationEmitInferredTypeAlias7.ts] ////

//// [0.ts]
export type Data = string | boolean;
let obj: Data = true;

//// [1.ts]
let v = "str" || true;
export { v }

//// [0.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let obj = true;
//// [1.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.v = void 0;
let v = "str" || true;
exports.v = v;
