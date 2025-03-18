//// [tests/cases/compiler/destructuringInVariableDeclarations7.ts] ////

//// [destructuringInVariableDeclarations7.ts]
export let { toString } = 1;
{
    let { toFixed } = 1;
}


//// [destructuringInVariableDeclarations7.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toString = void 0;
({ toString: exports.toString } = 1);
{
    let { toFixed } = 1;
}
