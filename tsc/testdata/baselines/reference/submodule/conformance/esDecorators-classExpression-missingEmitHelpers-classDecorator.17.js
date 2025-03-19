//// [tests/cases/conformance/esDecorators/classExpression/esDecorators-classExpression-missingEmitHelpers-classDecorator.17.ts] ////

//// [main.ts]
export {};
declare var dec: any;
declare var x: any;

var C;

// uses __esDecorate, __runInitializers, __setFunctionName, __propKey
({ [x]: C = @dec class {} } = {});

//// [tslib.d.ts]
export {}


//// [main.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var C;
// uses __esDecorate, __runInitializers, __setFunctionName, __propKey
({ [x]: C = 
    @dec
    class {
    } } = {});
