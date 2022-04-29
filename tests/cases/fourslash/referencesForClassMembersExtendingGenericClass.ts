/// <reference path='fourslash.ts'/>

////class Base<T> {
////    /*a1*/a: this;
////    /*method1*/method<U>(a?:T, b?:U): this { }
////}
////class MyClass extends Base<number> {
////    /*a2*/a;
////    /*method2*/method() { }
////}
////
////var c: MyClass;
////c./*a3*/a;
////c./*method3*/method();

verify.baselineFindAllReferences('a1', 'a2', 'a3', 'method1', 'method2', 'method3')
