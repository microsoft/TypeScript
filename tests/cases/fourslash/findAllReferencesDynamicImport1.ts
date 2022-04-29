/// <reference path='fourslash.ts' />

// @Filename: foo.ts
//// export function foo() { return "foo"; }

//// /*1*/import("/*2*/./foo")
//// /*3*/var x = import("/*4*/./foo")

verify.baselineFindAllReferences('1', '2', '3', '4');
