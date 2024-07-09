/// <reference path='fourslash.ts' />

// @noUnusedLocals: true
//// [| namespace greeter {
////   class class1 {
////   }
//// } |]

verify.rangeAfterCodeFix(`namespace greeter {
}`);
