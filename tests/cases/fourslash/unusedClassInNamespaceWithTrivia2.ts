/// <reference path='fourslash.ts' />

// @noUnusedLocals: true
//// [| namespace greeter {
////   /**
////    * JSDoc Comment
////    */
////   class /* comment2 */ class1 {
////   }
//// } |]

verify.rangeAfterCodeFix(`namespace greeter {
}`);
 