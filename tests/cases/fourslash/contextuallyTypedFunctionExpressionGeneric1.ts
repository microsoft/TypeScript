/// <reference path='fourslash.ts'/>

////interface Comparable<T> {
////    compareTo(other: T): T;
////}
////interface Comparer {
////    <T extends Comparable<T>>(x: T, y: T): T;
////}

////var max2: Comparer = (x/*1*/x, y/*2*/y) => { return x/*3*/x.compareTo(y/*4*/y) };

goTo.marker('1');
verify.quickInfoIs('any', null, 'xx');

goTo.marker('2');
verify.quickInfoIs('any', null, 'yy');

goTo.marker('3');
verify.quickInfoIs('any', null, 'xx');

goTo.marker('4');
verify.quickInfoIs('any', null, 'yy');
