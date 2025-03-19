//// [tests/cases/conformance/esDecorators/classExpression/esDecorators-classExpression-missingEmitHelpers-classDecorator.14.ts] ////

//// [main.ts]
export {};
declare var dec: any;
declare var x: any;

// uses __esDecorate, __runInitializers, __setFunctionName, __propKey
({ [x]: @dec class {} });

//// [tslib.d.ts]
export {}


//// [main.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// uses __esDecorate, __runInitializers, __setFunctionName, __propKey
({ [x]: 
    @dec
    class {
    } });
