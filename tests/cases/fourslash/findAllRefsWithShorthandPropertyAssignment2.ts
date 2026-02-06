/// <reference path='fourslash.ts'/>

//// var /*0*/dx = "Foo";
////
//// namespace M { export var /*1*/dx; }
//// namespace M {
////    var z = 100;
////    export var y = { /*2*/dx, z };
//// }
//// M.y./*3*/dx;

verify.baselineFindAllReferences('0', '1', '2', '3')
