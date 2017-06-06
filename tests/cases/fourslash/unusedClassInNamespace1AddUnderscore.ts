/// <reference path='fourslash.ts' />

// @noUnusedLocals: true
//// [| namespace greeter {
////   class class1 {
////   }
//// } |]

verify.rangeAfterCodeFix(`namespace greeter {
    class _class1 { }
}`, /*includeWhiteSpace*/ false, /*errorCode*/ undefined, /*index*/ 1);
