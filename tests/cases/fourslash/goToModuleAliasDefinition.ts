/// <reference path='fourslash.ts' />

// @Filename: a.ts
////export class /*2*/Foo {}

// @Filename: b.ts
//// import /*3*/n = require('a');
//// var x = new [|/*1*/n|].Foo();

// Won't-fixed: Should go to '2' instead
verify.baselineGoToDefinition("1");
