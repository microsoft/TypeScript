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

//// interface I1 extends I1 {
////    /*7*/doStuff1();
////    /*8*/propName1: string;
//// }
//// interface I2 extends I1 {
////    /*9*/doStuff1();
////    /*10*/propName1: string;
//// }
////
//// var v2: I2;
//// v2./*11*/propName1;
//// v2./*12*/doStuff1();


goTo.marker("1");
verify.referencesCountIs(3);

goTo.marker("2");
verify.referencesCountIs(3);

goTo.marker("3");
verify.referencesCountIs(3);

goTo.marker("4");
verify.referencesCountIs(3);

goTo.marker("5");
verify.referencesCountIs(3);

goTo.marker("6");
verify.referencesCountIs(3);

goTo.marker("7");
verify.referencesCountIs(3);

goTo.marker("8");
verify.referencesCountIs(3);

goTo.marker("9");
verify.referencesCountIs(3);

goTo.marker("10");
verify.referencesCountIs(3);

goTo.marker("11");
verify.referencesCountIs(3);

goTo.marker("12");
verify.referencesCountIs(3);