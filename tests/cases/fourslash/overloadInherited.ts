/// <reference path='fourslash.ts' />

////interface monster {
////    (a: "a"): void;
////    (b: "b"): void;
////    (c: "c"): void;
////    (d: "d"): void;
////    (e: "e"): void;
////    (x: string): void;
////}
////interface m1 extends monster {
////    a();
////}
////interface m2 extends monster {
////    b();
////}
////interface m3 extends monster {
////    (a: "other"): void; 
////}
////interface m4 extends monster { }
////interface m5 extends m1, m2, m3, m4 { }
////var waa: m5;
////wa/*1*/a("a")
////wa/*2*/a("other")

goTo.marker("1");
verify.quickInfoIs('var waa: m5(a: "a") => void (+6 overloads)');

goTo.marker("2");
verify.quickInfoIs('var waa: m5(a: "other") => void (+6 overloads)');
