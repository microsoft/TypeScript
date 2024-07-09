/// <reference path='fourslash.ts'/>

// Should go to object literals within cast expressions when invoked on interface

//// interface Fo/*interface_definition*/o { hello: () => void }
////
//// var x = <Foo> [|{ hello: () => {} }|];

verify.baselineGoToImplementation("interface_definition");