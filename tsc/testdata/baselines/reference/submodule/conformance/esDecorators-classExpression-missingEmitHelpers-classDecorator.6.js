//// [tests/cases/conformance/esDecorators/classExpression/esDecorators-classExpression-missingEmitHelpers-classDecorator.6.ts] ////

//// [main.ts]
export {};
declare var dec: any;

// uses __esDecorate, __runInitializers, __setFunctionName
({ C: @dec class {} });

//// [tslib.d.ts]
export {}


//// [main.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// uses __esDecorate, __runInitializers, __setFunctionName
({ C: 
    @dec
    class {
    } });
