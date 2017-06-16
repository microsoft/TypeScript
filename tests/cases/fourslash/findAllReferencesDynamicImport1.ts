/// <reference path='fourslash.ts' />

// @Filename: foo.ts
//// export function foo() { return "foo"; }

//// import("[|./foo|]")
//// var x = import("[|./foo|]")

verify.rangesReferenceEachOther();