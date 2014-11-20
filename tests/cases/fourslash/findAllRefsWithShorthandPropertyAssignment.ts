/// <reference path='fourslash.ts'/>

//// var /*1*/name = "Foo";
////
//// var obj = { /*2*/name };
//// var obj1 = { /*3*/name:name };
//// obj./*4*/name;

goTo.marker('1');
verify.referencesCountIs(3);

goTo.marker('2');
verify.referencesCountIs(4);

goTo.marker('3');
verify.referencesCountIs(1);

goTo.marker('4');
verify.referencesCountIs(2);
