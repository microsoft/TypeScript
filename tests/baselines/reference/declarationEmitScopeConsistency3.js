//// [tests/cases/compiler/declarationEmitScopeConsistency3.ts] ////

//// [a.ts]
export const g = (v: "outer") => {
    const f = (v: "inner") => () => null! as typeof v;
    const r = f(null!)
    return r;
}

//// [a.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.g = void 0;
var g = function (v) {
    var f = function (v) { return function () { return null; }; };
    var r = f(null);
    return r;
};
exports.g = g;


//// [a.d.ts]
export declare const g: (v: "outer") => () => "inner";
