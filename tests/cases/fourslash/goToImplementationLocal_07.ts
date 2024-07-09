/// <reference path='fourslash.ts'/>

// Should be able to go to ambient function declarations

//// declare function [|someFunction|](): () => void;
//// someFun/*reference*/ction();

verify.baselineGoToImplementation("reference");
