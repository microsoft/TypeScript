//// [tests/cases/conformance/esDecorators/classExpression/esDecorators-classExpression-missingEmitHelpers-classDecorator.5.ts] ////

//// [main.ts]
export {};
declare var dec: any;

var C;

// uses __esDecorate, __runInitializers, __setFunctionName
[C = @dec class {}] = [];

//// [tslib.d.ts]
export {}


//// [main.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var C;
[C = 
    @dec
    class {
    }] = [];
