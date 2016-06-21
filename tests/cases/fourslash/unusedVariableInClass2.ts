/// <reference path='fourslash.ts' />

// @noUnusedLocals: true
////class greeter {
////    public greeting1;/*0*/
////    private greeting: string;/*1*/
////}

verify.codeFixAtPosition(`
class greeter {
    public greeting1;
}`);
