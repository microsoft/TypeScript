//// [tests/cases/compiler/destructuringInVariableDeclarations6.ts] ////

//// [destructuringInVariableDeclarations6.ts]
let { toString } = 1;
{
    let { toFixed } = 1;
}
export {};


//// [destructuringInVariableDeclarations6.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let { toString } = 1;
{
    let { toFixed } = 1;
}
