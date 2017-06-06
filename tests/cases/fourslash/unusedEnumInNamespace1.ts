/// <reference path='fourslash.ts' />

// @noUnusedLocals: true
//// [| namespace greeter {
////   enum enum1 {
////       Monday
////   }
//// } |]

verify.rangeAfterCodeFix(`namespace greeter {
}`, /*includeWhiteSpace*/ false, /*errorCode*/ undefined, /*index*/ 0);
