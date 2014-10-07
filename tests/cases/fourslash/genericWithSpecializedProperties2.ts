/// <reference path='fourslash.ts'/>

////interface Foo<T> {
////    y: Foo<number>;
////    x: Foo<string>;
////}
////var f: Foo<string>;
////var /*1*/x = f.x; 
////var /*2*/y = f.y; 

////var f2: Foo<number>;
////var /*3*/x2 = f2.x; 
////var /*4*/y2 = f2.y; 

goTo.marker('1');
verify.quickInfoIs('(var) x: Foo<string>');
goTo.marker('2');
verify.quickInfoIs('(var) y: Foo<number>');

goTo.marker('3');
verify.quickInfoIs('(var) x2: Foo<string>');
goTo.marker('4');
verify.quickInfoIs('(var) y2: Foo<number>');