/// <reference path='fourslash.ts'/>

////class Base {
////    /*1*/a: number;
////    /*2*/method(): void { }
////}
////class MyClass extends Base {
////    /*3*/a;
////    /*4*/method() { }
////}
////
////var c: MyClass;
////c./*5*/a;
////c./*6*/method();

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
