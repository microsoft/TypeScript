/// <reference path="fourslash.ts" />
////async function fn(a: {}, b: number) {
////  a + b;
////}

verify.not.codeFixAvailable("addMissingAwait");
