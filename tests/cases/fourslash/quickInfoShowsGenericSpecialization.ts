/// <reference path='fourslash.ts'/>

////class A<T> { }
////var /**/foo = new A<number>();

verify.quickInfoAt("", "var foo: A<number>");
