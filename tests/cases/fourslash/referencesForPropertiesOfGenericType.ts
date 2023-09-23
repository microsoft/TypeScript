/// <reference path='fourslash.ts'/>

////interface IFoo<T> {
////    /*1*/doSomething(v: T): T;
////}
////
////var x: IFoo<string>;
////x./*2*/doSomething("ss");
////
////var y: IFoo<number>;
////y./*3*/doSomething(12);

verify.baselineFindAllReferences('1', '2', '3');
