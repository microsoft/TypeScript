/// <reference path='fourslash.ts' />

// @noUnusedLocals: true
// @noUnusedParameters: true
//// function f1() {
////     [|return <T>(x:number) => {x}|]
//// }

verify.codeFixAtPosition("return (x:number) => {x}");
