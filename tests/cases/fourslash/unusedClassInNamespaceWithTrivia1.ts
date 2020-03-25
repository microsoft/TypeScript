/// <reference path='fourslash.ts' />

// @noUnusedLocals: true
//// [| namespace greeter {
////   /* comment1 */
////   class /* comment2 */ class1 {
////   }
//// } |]

verify.rangeAfterCodeFix(`namespace greeter {
   /* comment1 */
}`);
