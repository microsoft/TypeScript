/// <reference path='fourslash.ts' />

// @noUnusedLocals: true
//// [|namespace A {
////    namespace B {
////     }
//// }|]

verify.codeFixAtPosition(`
namespace A {
}
`);

