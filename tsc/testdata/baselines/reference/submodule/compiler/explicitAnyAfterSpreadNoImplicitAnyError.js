//// [tests/cases/compiler/explicitAnyAfterSpreadNoImplicitAnyError.ts] ////

//// [explicitAnyAfterSpreadNoImplicitAnyError.ts]
({ a: [], ...(null as any) });
let x: any;


//// [explicitAnyAfterSpreadNoImplicitAnyError.js]
({ a: [], ...null });
let x;
