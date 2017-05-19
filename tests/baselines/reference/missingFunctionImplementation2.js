//// [tests/cases/compiler/missingFunctionImplementation2.ts] ////

//// [missingFunctionImplementation2_a.ts]
export {};
declare module "./missingFunctionImplementation2_b" {
  export function f(a, b): void;
}

//// [missingFunctionImplementation2_b.ts]
export function f(a?, b?);

//// [missingFunctionImplementation2_a.js]
"use strict";
exports.__esModule = true;
//// [missingFunctionImplementation2_b.js]
"use strict";
exports.__esModule = true;
