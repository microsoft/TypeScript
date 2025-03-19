//// [tests/cases/compiler/declarationEmitInferredTypeAlias5.ts] ////

//// [0.ts]
export type Data = string | boolean;
let obj: Data = true;

//// [1.ts]
import * as Z from "./0"
//let v2: Z.Data;
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
//let v2: Z.Data;
let v = "str" || true;
exports.v = v;
