/// <reference path='fourslash.ts'/>

// Should handle type queries

//// namespace [|F/*declaration*/oo|] {
////     declare function hello(): void;
//// }
////
////
//// let x: typeof Foo = [|{ hello() {} }|];

verify.baselineGoToImplementation("declaration");