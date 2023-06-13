//// [tests/cases/conformance/scanner/ecmascript5/scannerEnum1.ts] ////

//// [scannerEnum1.ts]
    export enum CodeGenTarget {
        ES3 = 0,
        ES5 = 1,
    }

//// [scannerEnum1.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CodeGenTarget = void 0;
var CodeGenTarget;
(function (CodeGenTarget) {
    CodeGenTarget[CodeGenTarget["ES3"] = 0] = "ES3";
    CodeGenTarget[CodeGenTarget["ES5"] = 1] = "ES5";
})(CodeGenTarget || (exports.CodeGenTarget = CodeGenTarget = {}));
