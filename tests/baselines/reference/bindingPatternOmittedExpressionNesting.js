//// [tests/cases/compiler/bindingPatternOmittedExpressionNesting.ts] ////

//// [bindingPatternOmittedExpressionNesting.ts]
export let [,,[,[],,[],]] = undefined as any;

//// [bindingPatternOmittedExpressionNesting.js]
"use strict";
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", { value: true });
exports._e = (_a = undefined, _a[0], _a[1], _b = _a[2], _b[0], _c = _b[1], _b[2], _d = _b[3]);


//// [bindingPatternOmittedExpressionNesting.d.ts]
export {};
