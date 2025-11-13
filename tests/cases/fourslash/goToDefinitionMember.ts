/// <reference path='fourslash.ts'/>

// @Filename: /a.ts
//// class A {
////     private z/*z*/: string;
//// }

verify.baselineGoToDefinition(
    "z"
);
