/// <reference path='fourslash.ts' />

// @Filename: foo.ts
//// /*Destination*/export function foo() { return "foo"; }

//// import([|"./f/*1*/oo"|])
//// var x = import([|"./fo/*2*/o"|])

verify.baselineGoToDefinition("1", "2");
