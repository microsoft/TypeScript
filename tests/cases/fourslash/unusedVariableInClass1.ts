/// <reference path='fourslash.ts' />

// @noUnusedLocals: true
////class greeter {/*0*/
////    private greeting: string;/*1*/
////}

verify.codeFixAtPosition(`
class greeter {
}`);
