/// <reference path='fourslash.ts' />

//// interface I { }
////
//// class C extends I {[|
//// |]}

verify.codeFixAtPosition(`f1(){
    throw new Error('Method not Implemented');
}
`);
