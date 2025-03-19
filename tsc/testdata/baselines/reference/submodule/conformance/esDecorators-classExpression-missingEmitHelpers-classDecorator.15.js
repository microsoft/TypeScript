//// [tests/cases/conformance/esDecorators/classExpression/esDecorators-classExpression-missingEmitHelpers-classDecorator.15.ts] ////

//// [main.ts]
export {};
declare var dec: any;

// uses __esDecorate, __runInitializers, __setFunctionName
class C { D = @dec class {} }

//// [tslib.d.ts]
export {}


//// [main.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// uses __esDecorate, __runInitializers, __setFunctionName
class C {
    D = 
    @dec
    class {
    };
}
