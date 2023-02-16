////module m {
////    export interface Foo {
////        [|abc|]
////    }
////}
////
////import Bar = m.Foo;
////
////export interface I extends Bar {
////    [|abc|]
////}
////
////class C implements Bar {
////    [|abc|]
////}
////
////(new C()).[|abc|];

verify.baselineDocumentHighlights();
