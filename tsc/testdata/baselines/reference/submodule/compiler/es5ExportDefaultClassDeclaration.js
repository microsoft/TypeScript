//// [tests/cases/compiler/es5ExportDefaultClassDeclaration.ts] ////

//// [es5ExportDefaultClassDeclaration.ts]
export default class C {
    method() { }
}


//// [es5ExportDefaultClassDeclaration.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class C {
    method() { }
}
exports.default = C;
