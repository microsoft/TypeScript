//// [destructuringInVariableDeclarations4.ts]
let { toString } = 1;
{
    let { toFixed } = 1;
}
export {};


//// [destructuringInVariableDeclarations4.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    let { toString } = 1;
    {
        let { toFixed } = 1;
    }
});
