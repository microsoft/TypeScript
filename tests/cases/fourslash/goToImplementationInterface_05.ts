/// <reference path='fourslash.ts'/>

// Should go to function literals that implement the interface within type assertions when invoked on an interface

//// interface Fo/*interface_definition*/o {
////     (a: number): void
//// }
////
//// let bar2 = <Foo> [|function(a) {}|];
////

verify.baselineGoToImplementation("interface_definition");