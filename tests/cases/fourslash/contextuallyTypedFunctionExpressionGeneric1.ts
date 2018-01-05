/// <reference path='fourslash.ts'/>

////interface Comparable<T> {
////   compareTo(other: T): T;
////}
////interface Comparer {
////   <T extends Comparable<T>>(x: T, y: T): T;
////}

////var max2: Comparer = (x/*1*/x, y/*2*/y) => { return x/*3*/x.compareTo(y/*4*/y) };

verify.quickInfos({
    1: "(parameter) xx: T extends Comparable<T>",
    2: "(parameter) yy: T extends Comparable<T>",
    3: "(parameter) xx: T extends Comparable<T>",
    4: "(parameter) yy: T extends Comparable<T>"
});
