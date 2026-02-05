//// [tests/cases/compiler/explicitAnyAfterSpreadNoImplicitAnyError.ts] ////

//// [explicitAnyAfterSpreadNoImplicitAnyError.ts]
({ a: [], ...(null as any) });
let x: any;


//// [explicitAnyAfterSpreadNoImplicitAnyError.js]
"use strict";
(Object.assign({ a: [] }, null));
let x;
