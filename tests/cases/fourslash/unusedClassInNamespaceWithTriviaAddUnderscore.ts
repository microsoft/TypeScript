/// <reference path='fourslash.ts' />

// @noUnusedLocals: true
//// [| namespace greeter {
////   /* comment1 */
////   class /* comment2 */ class1 {
////   }
//// } |]

verify.rangeAfterCodeFix(`namespace greeter {
    /* comment1 */
    class /* comment2 */ _class1 {
    }
}`, /*includeWhiteSpace*/ false, /*errorCode*/ undefined, /*index*/ 1);
