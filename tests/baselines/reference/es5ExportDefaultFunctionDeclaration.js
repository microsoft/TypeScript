//// [es5ExportDefaultFunctionDeclaration.ts]

export default function f() { }


//// [es5ExportDefaultFunctionDeclaration.js]
"use strict";
function f() { }
exports.default = f;
Object.defineProperty(exports, "__esModule", { value: true });


//// [es5ExportDefaultFunctionDeclaration.d.ts]
export default function f(): void;
