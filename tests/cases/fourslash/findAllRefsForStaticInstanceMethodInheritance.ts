/// <reference path='fourslash.ts'/>

////class X{
////	/*0*/foo(): void{}
////}
////
////class Y extends X{
////	static /*1*/foo(): void{}
////}
////
////class Z extends Y{
////	static /*2*/foo(): void{}
////	/*3*/foo(): void{}
////}
////
////const x = new X();
////const y = new Y();
////const z = new Z();
////x.foo();
////y.foo();
////z.foo();
////Y.foo();
////Z.foo();

verify.baselineFindAllReferences('0', '1', '2', '3')
