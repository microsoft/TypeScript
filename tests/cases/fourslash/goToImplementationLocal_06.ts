/// <reference path='fourslash.ts'/>

// Should be able to go to ambient variable declarations

//// declare var [|someVar|]: string;
//// someVa/*reference*/r

verify.baselineGoToImplementation("reference");
