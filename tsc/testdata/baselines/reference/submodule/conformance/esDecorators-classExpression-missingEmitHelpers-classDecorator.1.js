//// [tests/cases/conformance/esDecorators/classExpression/esDecorators-classExpression-missingEmitHelpers-classDecorator.1.ts] ////

//// [main.ts]
declare var dec: any;

// uses: __esDecorate, __runInitializers, __setFunctionName
export const C = @dec class {};

//// [tslib.d.ts]
export {}


//// [main.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.C = void 0;
// uses: __esDecorate, __runInitializers, __setFunctionName
const C = 
@dec
class {
};
exports.C = C;
