/// <reference path='fourslash.ts'/>

// Should handle members of object literals in type assertion expressions

//// interface Foo {
////    hel/*reference*/lo(): void;
//// }
////
//// var x = <Foo> { [|hello|]: () => {} };
//// var y = <Foo> (((({ [|hello|]: () => {} }))));

verify.baselineGoToImplementation("reference");