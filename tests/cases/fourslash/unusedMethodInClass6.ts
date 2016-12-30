/// <reference path='fourslash.ts' />

// @noUnusedLocals: true
//// [|class C {
////     private "string" (){} 
//// }|]

verify.rangeAfterCodeFix("class C { }");