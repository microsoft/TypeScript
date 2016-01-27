/// <reference path='fourslash.ts'/>

//// class class1 extends class1 {
////    /*1*/doStuff() { }
////    /*2*/propName: string;
//// }
//// class class2 extends class1 {
////    /*3*/doStuff() { }
////    /*4*/propName: string;
//// }
////
//// var v: class2;
//// v./*5*/propName;
//// v./*6*/doStuff();

goTo.marker("1");
verify.referencesCountIs(1);

goTo.marker("2");
verify.referencesCountIs(3);

goTo.marker("3");
verify.referencesCountIs(2);

goTo.marker("4");
verify.referencesCountIs(3);

goTo.marker("5");
verify.referencesCountIs(3);

goTo.marker("6");
verify.referencesCountIs(2);