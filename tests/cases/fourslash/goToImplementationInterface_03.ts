/// <reference path='fourslash.ts'/>

//// interface Fo/*interface_definition*/o { hello: () => void }
////
//// var x = <Foo> [|{ hello: () => {} }|];

goTo.marker("interface_definition");
verify.allRangesAppearInImplementationList();