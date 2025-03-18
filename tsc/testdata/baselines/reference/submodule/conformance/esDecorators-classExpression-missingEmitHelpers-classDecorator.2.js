//// [tests/cases/conformance/esDecorators/classExpression/esDecorators-classExpression-missingEmitHelpers-classDecorator.2.ts] ////

//// [main.ts]
declare var dec: any;

// uses: __esDecorate, __runInitializers
export const C = @dec class C {};

//// [tslib.d.ts]
export {}


//// [main.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.C = void 0;
exports.C = 
@dec
class C {
};
