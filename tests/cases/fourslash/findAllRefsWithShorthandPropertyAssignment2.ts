/// <reference path='fourslash.ts'/>

//// var /*1*/dx = "Foo";
////
//// module M { export var /*2*/dx; }
//// module M {
////    var z = 100;
////    export var y = { /*3*/dx, z };
//// }
//// M.y./*4*/dx;

goTo.marker('1');
verify.referencesCountIs(1);

goTo.marker('2');
verify.referencesCountIs(2);

goTo.marker('3');
verify.referencesCountIs(3);

goTo.marker('4');
verify.referencesCountIs(2);