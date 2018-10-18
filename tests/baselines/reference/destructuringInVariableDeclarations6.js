//// [destructuringInVariableDeclarations6.ts]
let { toString } = 1;
{
    let { toFixed } = 1;
}
export {};


//// [destructuringInVariableDeclarations6.js]
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    let { toString } = 1;
    {
        let { toFixed } = 1;
    }
});
