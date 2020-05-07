/// <reference path='fourslash.ts' />

// @noUnusedLocals: true
//// [| namespace greeter {
////   // Do not remove
////   /**
////    * JSDoc Comment
////    */
////   class /* comment2 */ class1 {
////   }
//// } |]

verify.rangeAfterCodeFix(`namespace greeter {
   // Do not remove
}`);
 