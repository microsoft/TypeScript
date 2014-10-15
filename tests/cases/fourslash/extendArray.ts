/// <reference path='fourslash.ts'/>

////interface Foo<T> extends Array<T> { }
////var x: Foo<string>;
////var /*1*/r = x[0];

////interface Foo2 extends Array<string> { }
////var x2: Foo2;
////var /*2*/r2 = x2[0];

goTo.marker('1');
verify.quickInfoIs('(var) r: string');

goTo.marker('2');
verify.quickInfoIs('(var) r2: string');