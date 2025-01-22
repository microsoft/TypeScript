//// [tests/cases/compiler/solutionStyleRoot.ts] ////

//// [solutionStyleRoot.ts]
export const tsconfig = {
    "references": [
        { "path": "./lib" },
        { "path": "./app" }
    ]
}


//// [solutionStyleRoot.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tsconfig = void 0;
exports.tsconfig = {
    "references": [
        { "path": "./lib" },
        { "path": "./app" }
    ]
};
