//// [destructuringInVariableDeclarations1.ts]
export let { toString } = 1;
{
    let { toFixed } = 1;
}


//// [destructuringInVariableDeclarations1.js]
"use strict";
exports.toString = (1).toString;
{
    let { toFixed } = 1;
}
Object.defineProperty(exports, "__esModule", { value: true });
