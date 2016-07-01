/// <reference path='fourslash.ts' />

////    interface I1 {}
////    class c1<T extends string , U > /*0*/extends/*1*/ I1{}

verify.codeFixAtPosition(`
interface I1 {}
class c1<T extends string , U > implements I1{}
`);