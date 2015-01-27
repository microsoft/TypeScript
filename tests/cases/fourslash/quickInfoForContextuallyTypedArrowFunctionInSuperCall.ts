/// <reference path='fourslash.ts'/>

////class A<T1, T2> {
////    constructor(private map: (value: T1) => T2) {
////
////    }
////}
////
////class B extends A<number, string> {
////    constructor() { super(va/*1*/lue => String(va/*2*/lue.toExpone/*3*/ntial())); }
////}

goTo.marker('1');
verify.quickInfoIs('(var) value: number');

goTo.marker('2');
verify.quickInfoIs('(var) value: number');

goTo.marker('3');
verify.quickInfoIs('(method) Number.toExponential(fractionDigits?: number): string');