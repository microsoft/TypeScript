/// <reference path='fourslash.ts'/>

////interface A {
////    length: number;
////}
////interface B extends A {
////    width: number;
////}
////interface C extends B {
////    radius: number;
////    bar: string;
////}
////var x: A|B|C;
////if (x./*1*/length && x.width) {
////    var r = x./*2*/width; // x is B|C
////    if (x./*3*/radius) {
////        var r2 = x./*4*/bar; // x is C
////    }
////}
////if (x.length && x.width && x./*5*/bar) {
////    var r3 = x./*6*/radius;
////}
////var r4 = x.radius ? x./*7*/bar : x./*8*/length;
////var r5 = x.length && x.width ? (x./*9*/radius ? x./*10*/bar : x./*11*/length) : x.length;

goTo.marker('1');
verify.completionListContains('length');
verify.not.completionListContains('width');
goTo.marker('2');
verify.completionListContains('length');
verify.completionListContains('width');
goTo.marker('3');
verify.completionListContains('length');
verify.completionListContains('width');
goTo.marker('4');
verify.completionListContains('length');
verify.completionListContains('width');
verify.completionListContains('bar');
verify.completionListContains('radius');
goTo.marker('5');
verify.completionListContains('length');
verify.completionListContains('width');
goTo.marker('6');
verify.completionListContains('length');
verify.completionListContains('width');
verify.completionListContains('bar');
verify.completionListContains('radius');
goTo.marker('7');
verify.completionListContains('length');
verify.completionListContains('width');
verify.completionListContains('bar');
verify.completionListContains('radius');
goTo.marker('8');
verify.completionListContains('length');
verify.not.completionListContains('width');
goTo.marker('9');
verify.completionListContains('length');
verify.completionListContains('width');
goTo.marker('10');
verify.completionListContains('length');
verify.completionListContains('width');
verify.completionListContains('bar');
verify.completionListContains('radius');
goTo.marker('11');
verify.completionListContains('length');
verify.completionListContains('width');