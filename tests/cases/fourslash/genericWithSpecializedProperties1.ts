/// <reference path='fourslash.ts'/>

////interface Foo<T> {
////    x: Foo<string>;
////    y: Foo<number>;
////}

////var f: Foo<number>;
////var /*1*/xx = f.x;
////var /*2*/yy = f.y;

////var f2: Foo<string>;
////var /*3*/x2 = f2.x;
////var /*4*/y2 = f2.y;

goTo.marker('1');
verify.quickInfoIs('(var) xx: Foo<string>');
goTo.marker('2');
verify.quickInfoIs('(var) yy: Foo<number>');

goTo.marker('3');
verify.quickInfoIs('(var) x2: Foo<string>');
goTo.marker('4');
verify.quickInfoIs('(var) y2: Foo<number>');