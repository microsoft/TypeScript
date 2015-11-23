//// [scannerEnum1.ts]
    export enum CodeGenTarget {
        ES3 = 0,
        ES5 = 1,
    }

//// [scannerEnum1.js]
"use strict";
(function (CodeGenTarget) {
    CodeGenTarget[CodeGenTarget["ES3"] = 0] = "ES3";
    CodeGenTarget[CodeGenTarget["ES5"] = 1] = "ES5";
})(exports.CodeGenTarget || (exports.CodeGenTarget = {}));
var CodeGenTarget = exports.CodeGenTarget;
