/// <reference path='fourslash.ts'/>

//// var /*0*/dx = "Foo";
////
//// module M { export var /*1*/dx; }
//// module M {
////    var z = 100;
////    export var y = { /*2*/dx, z };
//// }
//// M.y./*3*/dx;

verify.baselineFindAllReferences('0', '1', '2', '3')
