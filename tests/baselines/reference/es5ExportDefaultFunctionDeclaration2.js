//// [tests/cases/compiler/es5ExportDefaultFunctionDeclaration2.ts] ////

//// [es5ExportDefaultFunctionDeclaration2.ts]
export default function () { }


//// [es5ExportDefaultFunctionDeclaration2.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
function default_1() { }


//// [es5ExportDefaultFunctionDeclaration2.d.ts]
export default function (): void;
