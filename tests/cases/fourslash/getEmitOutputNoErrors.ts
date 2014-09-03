/// <reference path="fourslash.ts" />

// @Filename: noErrorsResult.ts
//// var x;
//// class M {
////   x: number;
////   y: string;
//// }

verify.emitOutput(EmitOutputResult.Succeeded, "tests/cases/fourslash/noErrorsResult.js");