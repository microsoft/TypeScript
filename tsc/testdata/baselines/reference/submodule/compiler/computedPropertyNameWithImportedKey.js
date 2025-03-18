//// [tests/cases/compiler/computedPropertyNameWithImportedKey.ts] ////

//// [a.ts]
export const a = Symbol();

//// [b.ts]
import { a } from "./a";
export function fn({ [a]: value }: any): string {
    return value;
}


//// [a.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.a = void 0;
exports.a = Symbol();
//// [b.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fn = fn;
const a_1 = require("./a");
function fn({ [a_1.a]: value }) {
    return value;
}
