/// <reference path='fourslash.ts'/>

//// interface C extends D {
////     /*0*/propD: number;
//// }
//// interface D extends C {
////     /*1*/propD: string;
////     /*3*/propC: number;
//// }
//// var d: D;
//// d./*2*/propD;
//// d./*4*/propC;

goTo.marker("0");
verify.referencesCountIs(3);

goTo.marker("1");
verify.referencesCountIs(3);

goTo.marker("2");
verify.referencesCountIs(3);

goTo.marker("3");
verify.referencesCountIs(2);

goTo.marker("4");
verify.referencesCountIs(2);