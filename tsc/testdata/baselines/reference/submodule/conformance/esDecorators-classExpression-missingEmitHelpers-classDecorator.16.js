//// [tests/cases/conformance/esDecorators/classExpression/esDecorators-classExpression-missingEmitHelpers-classDecorator.16.ts] ////

//// [main.ts]
export {};
declare var dec: any;
declare var x: any;

// uses __esDecorate, __runInitializers, __setFunctionName, __propKey
class C { [x] = @dec class {} }

//// [tslib.d.ts]
export {}


//// [main.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// uses __esDecorate, __runInitializers, __setFunctionName, __propKey
class C {
    [x] = 
    @dec
    class {
    };
}
