/// <reference path='fourslash.ts' />

//// class A {
////     constructor(public x: number) { }
//// }
////
//// class B implements A {[| |]}

verify.codeFixAvailable([]);

// TODO: (arozga) Get this working.
/*
verify.rangeAfterCodeFix(`
public x: number;
`);
*/
