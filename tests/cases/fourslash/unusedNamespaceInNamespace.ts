/// <reference path='fourslash.ts' />

// @noUnusedLocals: true
//// [|namespace A {
////    namespace B {
////     }
//// }|]

verify.rangeAfterCodeFix(`
namespace A {
}
`, /*includeWhiteSpace*/ false, /*errorCode*/ undefined, /*index*/ 0);

