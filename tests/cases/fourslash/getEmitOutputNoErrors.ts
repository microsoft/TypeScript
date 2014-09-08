/// <reference path="fourslash.ts" />

// @Filename: noErrorsResult.ts
//// var x;
//// class M {
////   x: number;
////   y: string;
//// }

verify.emitOutput(EmitReturnStatus.Succeeded, "tests/cases/fourslash/noErrorsResult.js");