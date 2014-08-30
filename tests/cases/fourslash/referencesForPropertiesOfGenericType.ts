/// <reference path='fourslash.ts'/>

////interface IFoo<T> {
////    /*1*/doSomething(v: T): T;
////}
////
////var x: IFoo<string>;
////x.doSomething("ss");
////
////var y: IFoo<number>;
////y.doSomething(12);


goTo.marker("1");
verify.referencesCountIs(3);