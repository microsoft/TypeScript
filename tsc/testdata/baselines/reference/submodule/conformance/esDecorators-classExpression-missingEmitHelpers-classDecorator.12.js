//// [tests/cases/conformance/esDecorators/classExpression/esDecorators-classExpression-missingEmitHelpers-classDecorator.12.ts] ////

//// [main.ts]
export {};
declare var dec: any;

// uses __esDecorate, __runInitializers, __setFunctionName
function f(C = @dec class {}) {}

//// [tslib.d.ts]
export {}


//// [main.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function f(C = 
@dec
class {
}) { }
