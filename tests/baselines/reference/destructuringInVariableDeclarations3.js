//// [tests/cases/compiler/destructuringInVariableDeclarations3.ts] ////

//// [destructuringInVariableDeclarations3.ts]
export let { toString } = 1;
{
    let { toFixed } = 1;
}


//// [destructuringInVariableDeclarations3.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.toString = void 0;
    exports.toString = 1..toString;
    {
        let { toFixed } = 1;
    }
});
