//// [tests/cases/compiler/destructuringInVariableDeclarations8.ts] ////

//// [destructuringInVariableDeclarations8.ts]
let { toString } = 1;
{
    let { toFixed } = 1;
}
export {};


//// [destructuringInVariableDeclarations8.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let { toString } = 1;
{
    let { toFixed } = 1;
}
