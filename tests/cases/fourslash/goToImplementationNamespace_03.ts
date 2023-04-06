/// <reference path='fourslash.ts'/>

// Should handle types that are members of a namespace in type references and heritage clauses

//// namespace Foo {
////     export interface Bar {
////         hello(): void;
////     }
////
////     class [|BarImpl|] implements Bar {
////         hello() {}
////     }
//// }
////
//// class [|Baz|] implements Foo.Bar {
////     hello() {}
//// }
////
//// var someVar1 : Foo.Bar = [|{ hello: () => {/**1*/} }|];
////
//// var someVar2 = <Foo.Bar> [|{ hello: () => {/**2*/} }|];
////
//// function whatever(x: Foo.Ba/*reference*/r) {
////
//// }

verify.baselineGoToImplementation("reference");
