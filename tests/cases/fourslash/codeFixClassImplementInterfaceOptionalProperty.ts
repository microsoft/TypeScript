/// <reference path='fourslash.ts' />

//// interface IPerson {
////     name: string;
////     birthday?: string;
//// }
//// 
//// class Person implements IPerson {[| |]}

verify.rangeAfterCodeFix(`
    name: string;
    birthday?: string;
`);