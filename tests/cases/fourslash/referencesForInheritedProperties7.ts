/// <reference path='fourslash.ts'/>

//// class class1 extends class1 {
////    /*1*/doStuff() { }
////    /*2*/propName: string;
//// }
//// interface interface1 extends interface1 {
////    /*3*/doStuff(): void;
////    /*4*/propName: string;
//// }
//// class class2 extends class1 implements interface1 {
////    /*5*/doStuff() { }
////    /*6*/propName: string;
//// }
////
//// var v: class2;
//// v./*7*/propName;
//// v./*8*/doStuff();

goTo.marker("1");
verify.referencesCountIs(1);

goTo.marker("2");
verify.referencesCountIs(3);

goTo.marker("3");
verify.referencesCountIs(3);

goTo.marker("4");
verify.referencesCountIs(3);

goTo.marker("5");
verify.referencesCountIs(3);

goTo.marker("6");
verify.referencesCountIs(4);

goTo.marker("7");
verify.referencesCountIs(4);

goTo.marker("8");
verify.referencesCountIs(3);