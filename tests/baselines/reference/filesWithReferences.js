//// [tests/cases/compiler/filesWithReferences.ts] ////

//// [filesWithReferences.ts]
export const tsconfig = {
    "files": [],
    "references": [{ "path": "./lib" }]
}


//// [filesWithReferences.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tsconfig = void 0;
exports.tsconfig = {
    "files": [],
    "references": [{ "path": "./lib" }]
};
