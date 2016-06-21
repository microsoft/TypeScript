/// <reference path='fourslash.ts' />

// @noUnusedLocals: true
////class greeter<X/*0*/, Y/*1*/, Z> {
////    public a: X;
////    public b: Z;
////}

verify.codeFixAtPosition(`
class greeter<X, Z> {
    public a: X;
    public b: Z;
}`);
