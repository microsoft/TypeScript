//// [tests/cases/conformance/es6/modules/exportsAndImports5.ts] ////

//// [a.ts]
export interface A { }

//// [b.ts]
import { A } from "./a"
export function f(): A {
    return {};
}
export { f as fV2 };


//// [a.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//// [b.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.f = f;
exports.fV2 = f;
function f() {
    return {};
}
