/// <reference path='fourslash.ts'/>

// @Filename: /b.ts
/////*2*/export const foo = 1;

// @Filename: /a.ts
////import { foo } from      [|"./b/*1*/"|];

verify.baselineGoToDefinition("1");
