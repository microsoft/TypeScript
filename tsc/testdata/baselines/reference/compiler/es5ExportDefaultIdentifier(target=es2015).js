//// [tests/cases/compiler/es5ExportDefaultIdentifier.ts] ////

//// [es5ExportDefaultIdentifier.ts]
export function f() { }

export default f;


//// [es5ExportDefaultIdentifier.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.f = f;
function f() { }
exports.default = f;


//// [es5ExportDefaultIdentifier.d.ts]
export declare function f(): void;
export default f;
