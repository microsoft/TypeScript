/// <reference path='fourslash.ts' />

// @noUnusedLocals: true
//// [|namespace A {
////    namespace B {
////     }
//// }|]

verify.rangeAfterCodeFix(`
namespace A {
}
`);

