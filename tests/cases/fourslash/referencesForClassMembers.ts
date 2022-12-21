/// <reference path='fourslash.ts'/>

////class Base {
////    /*a1*/a: number;
////    /*method1*/method(): void { }
////}
////class MyClass extends Base {
////    /*a2*/a;
////    /*method2*/method() { }
////}
////
////var c: MyClass;
////c./*a3*/a;
////c./*method3*/method();

verify.baselineFindAllReferences('a1', 'a2', 'a3', 'method1', 'method2', 'method3')
