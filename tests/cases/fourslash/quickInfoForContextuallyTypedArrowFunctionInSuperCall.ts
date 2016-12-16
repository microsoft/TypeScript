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

verify.quickInfos({
    1: "(parameter) value: number",
    2: "(parameter) value: number",
    3: [
        "(method) Number.toExponential(fractionDigits?: number): string",
        "Returns a string containing a number represented in exponential notation."
    ]
});
