//// [tests/cases/conformance/esDecorators/classExpression/esDecorators-classExpression-missingEmitHelpers-classDecorator.3.ts] ////

//// [main.ts]
declare var dec: any;

// uses __esDecorate, __runInitializers, __setFunctionName
export default (@dec class {});

//// [tslib.d.ts]
export {}


//// [main.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// uses __esDecorate, __runInitializers, __setFunctionName
exports.default = (
@dec
class {
});
