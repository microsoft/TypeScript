//// [tests/cases/compiler/controlFlowInitializedDestructuringVariables.ts] ////

//// [controlFlowInitializedDestructuringVariables.ts]
declare const obj: { a?: string, b?: number };
const {
    a = "0",
    b = +a,
} = obj;


//// [controlFlowInitializedDestructuringVariables.js]
"use strict";
var _a = obj.a, a = _a === void 0 ? "0" : _a, _b = obj.b, b = _b === void 0 ? +a : _b;
