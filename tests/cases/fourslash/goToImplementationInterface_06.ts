/// <reference path='fourslash.ts'/>

// Should go to class expressions that implement a constructor type

//// interface Fo/*interface_definition*/o {
////     new (a: number): SomeOtherType;
//// }
////
//// interface SomeOtherType {}
////
//// let x: Foo = [|class { constructor (a: number) {} }|];
//// let y = <Foo> [|class { constructor (a: number) {} }|];

verify.baselineGoToImplementation("interface_definition");