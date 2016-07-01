/// <reference path='fourslash.ts' />

////    interface I1 {}
////    class c1 /*0*/extends/*1*/ I1{}

verify.codeFixAtPosition(`
interface I1 {}
class c1 implements I1{}
`);