/// <reference path='fourslash.ts' />

//// interface I {
////    f1();
//// }
////
//// class /*0*/C/*1*/ /*2*/extend/*3*/s/*4*/ /*5*/I/*6*/ {/*7*/}

for (let i = 0; i < 8; ++i) {
    goTo.marker("" + i);
    verify.codeFixAtPosition("");
}