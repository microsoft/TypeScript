/// <reference path='fourslash.ts' />

// @Filename: Definition.ts
////class /*2*/c { }

// @Filename: Consumption.ts
//// var n = new [|/*1*/c|]();
//// var n = new [|c/*3*/|]();

verify.baselineGoToDefinition("1", "3");
