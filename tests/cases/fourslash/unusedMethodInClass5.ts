/// <reference path='fourslash.ts' />

// @noUnusedLocals: true
//// [|class C {
////     private ["string"] (){} 
//// }|]

verify.codeFixAtPosition("class C { }");