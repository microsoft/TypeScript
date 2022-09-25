/// <reference path='fourslash.ts'/>

////class X{
////	/*0*/foo:any
////}
////
////class Y extends X{
////	static /*1*/foo:any
////}
////
////class Z extends Y{
////	static /*2*/foo:any
////	/*3*/foo:any
////}
////
////const x = new X();
////const y = new Y();
////const z = new Z();
////x./*4*/foo;
////y./*5*/foo;
////z./*6*/foo;
////Y./*7*/foo;
////Z./*8*/foo;

verify.baselineFindAllReferences('0', '1', '2', '3', '4', '5', '6', '7', '8')
