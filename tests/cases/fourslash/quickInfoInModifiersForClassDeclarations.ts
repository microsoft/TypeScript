/// <reference path="fourslash.ts" />

//// /*1*/export /*2*/class A {}
////
//// /*3*/export /*4*/default /*5*/class B {
////      /*6*/private privateProperty: string;
////      /*7*/protected protectedProperty: string;
////      /*8*/public publicProperty: string;
////      /*9*/static staticProperty: string;
////
////      /*10*/private privateMethod() {}
////      /*11*/protected protectedMethod() {}
////      /*12*/public publicMethod() {}
////      /*13*/static staticMethod() {}
//// }
////
//// interface C {}
//// class D /*14*/implements C {}
//// class E /*15*/extends D {}

goTo.marker("1");
verify.quickInfoIs("class A");

goTo.marker("2");
verify.quickInfoIs("class A");

goTo.marker("3");
verify.quickInfoIs("class B");

goTo.marker("4");
verify.quickInfoIs("class B");

goTo.marker("5");
verify.quickInfoIs("class B");

goTo.marker("6");
verify.quickInfoIs("(property) B.privateProperty: string");

goTo.marker("7");
verify.quickInfoIs("(property) B.protectedProperty: string");

goTo.marker("8");
verify.quickInfoIs("(property) B.publicProperty: string");

goTo.marker("9");
verify.quickInfoIs("(property) B.staticProperty: string");

goTo.marker("10");
verify.quickInfoIs("(method) B.privateMethod(): void");

goTo.marker("11");
verify.quickInfoIs("(method) B.protectedMethod(): void");

goTo.marker("12");
verify.quickInfoIs("(method) B.publicMethod(): void");

goTo.marker("13");
verify.quickInfoIs("(method) B.staticMethod(): void");

goTo.marker("14");
verify.quickInfoIs("interface C");

goTo.marker("15");
verify.quickInfoIs("class D");