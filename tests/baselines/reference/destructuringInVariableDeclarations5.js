//// [tests/cases/compiler/destructuringInVariableDeclarations5.ts] ////

//// [destructuringInVariableDeclarations5.ts]
export let { toString } = 1;
{
    let { toFixed } = 1;
}


//// [destructuringInVariableDeclarations5.js]
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
    exports.toString = void 0;
    exports.toString = 1..toString;
    {
        let { toFixed } = 1;
    }
});
