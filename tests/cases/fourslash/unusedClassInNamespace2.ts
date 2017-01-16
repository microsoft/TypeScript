/// <reference path='fourslash.ts' />

// @noUnusedLocals: true
//// [| namespace greeter {
////    export class class2 {
////    }
////    class class1 {
////    }
//// } |]

verify.rangeAfterCodeFix(`namespace greeter {
    export class class2 {
    }
}`);

