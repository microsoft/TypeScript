/// <reference path='fourslash.ts' />

// @noUnusedLocals: true
////class greeter<X/*0*/, Y/*1*/> {
////    public a: X;
////}

verify.codeFixAtPosition(`
class greeter<X> {
    public a: X;
}`);
