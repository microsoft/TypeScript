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
verify.quickInfoIs('(var) f1: Foo<number>', null);

goTo.marker('2');
verify.quickInfoIs('(var) f2: Foo<number>', null);

goTo.marker('3');
verify.quickInfoIs('(var) f3: any', null);

goTo.marker('4');
verify.quickInfoIs('(var) f4: Foo<number>', null);

goTo.marker('5');
verify.quickInfoIs('(var) f5: any', null);

goTo.marker('6');
verify.quickInfoIs('(var) f6: Foo<number>', null);