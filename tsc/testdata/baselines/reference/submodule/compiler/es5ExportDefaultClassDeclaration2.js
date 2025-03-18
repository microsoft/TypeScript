//// [tests/cases/compiler/es5ExportDefaultClassDeclaration2.ts] ////

//// [es5ExportDefaultClassDeclaration2.ts]
export default class {
    method() { }
}


//// [es5ExportDefaultClassDeclaration2.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class default_1 {
    method() { }
}
exports.default = default_1;
