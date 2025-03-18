//// [tests/cases/conformance/statements/VariableStatements/usingDeclarations/usingDeclarationsTopLevelOfModule.1.ts] ////

//// [usingDeclarationsTopLevelOfModule.1.ts]
export const x = 1;
export { y };

using z = { [Symbol.dispose]() {} };

const y = 2;

export const w = 3;

export default 4;

console.log(w, x, y, z);


//// [usingDeclarationsTopLevelOfModule.1.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.w = exports.y = exports.x = void 0;
exports.x = 1;
using z = { [Symbol.dispose]() { } };
const y = 2;
exports.y = y;
exports.w = 3;
exports.default = 4;
console.log(exports.w, exports.x, y, z);
