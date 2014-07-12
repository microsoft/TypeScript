/// <reference path='fourslash.ts'/>

////interface Foo<T> {
////    new (x: number): Foo<T>;
////}
////declare var f/*1*/1: Foo<number>;
////var f/*2*/2: Foo<number>;
////var f/*3*/3 = new Foo(3);
////var f/*4*/4: Foo<number> = new Foo(3);
////var f/*5*/5 = new Foo<number>(3);
////var f/*6*/6: Foo<number> = new Foo<number>(3);

goTo.marker('1');
verify.quickInfoIs('Foo<number>', null, 'f1');

goTo.marker('2');
verify.quickInfoIs('Foo<number>', null, 'f2');

goTo.marker('3');
verify.quickInfoIs('any', null, 'f3');

goTo.marker('4');
verify.quickInfoIs('Foo<number>', null, 'f4');

goTo.marker('5');
verify.quickInfoIs('any', null, 'f5');

goTo.marker('6');
verify.quickInfoIs('Foo<number>', null, 'f6');