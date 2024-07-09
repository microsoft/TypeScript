/// <reference path='fourslash.ts'/>

// @Filename: /b.ts
/////*2*/export const foo = 1;

// @Filename: /a.ts
////import { foo } [|from     /*1*/|] "./b";

verify.baselineGoToDefinition("1");
