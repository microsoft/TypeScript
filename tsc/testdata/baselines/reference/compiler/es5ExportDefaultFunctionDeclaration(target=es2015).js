//// [tests/cases/compiler/es5ExportDefaultFunctionDeclaration.ts] ////

//// [es5ExportDefaultFunctionDeclaration.ts]
export default function f() { }


//// [es5ExportDefaultFunctionDeclaration.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = f;
function f() { }


//// [es5ExportDefaultFunctionDeclaration.d.ts]
export default function f(): void;
