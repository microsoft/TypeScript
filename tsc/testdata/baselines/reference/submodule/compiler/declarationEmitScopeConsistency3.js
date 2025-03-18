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
const g = (v) => {
    const f = (v) => () => null;
    const r = f(null);
    return r;
};
exports.g = g;
