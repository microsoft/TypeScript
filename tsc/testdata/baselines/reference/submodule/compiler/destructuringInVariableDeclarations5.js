//// [tests/cases/compiler/destructuringInVariableDeclarations5.ts] ////

//// [destructuringInVariableDeclarations5.ts]
export let { toString } = 1;
{
    let { toFixed } = 1;
}


//// [destructuringInVariableDeclarations5.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toString = void 0;
({ toString: exports.toString } = 1);
{
    let { toFixed } = 1;
}
