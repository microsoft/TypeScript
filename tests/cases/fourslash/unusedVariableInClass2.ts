/// <reference path='fourslash.ts' />

// @noUnusedLocals: true
////class greeter {
////    public greeting1;/*0*/
////    private greeting: string;/*1*/
////}

verify.codeFixAtPosition({ span: { start: 0, end: 0 }, newText: "" });
