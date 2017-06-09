/// <reference path='fourslash.ts' />

// @noUnusedLocals: true
// @noUnusedParameters:true
////class greeter {
////    [| constructor() {
////        var unused = 20;
////    } |]
////}

verify.rangeAfterCodeFix(`constructor() {
}`);
