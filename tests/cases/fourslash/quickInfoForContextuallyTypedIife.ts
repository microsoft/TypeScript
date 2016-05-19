/// <reference path='fourslash.ts' />

////(({ q/*1*/, qq/*2*/ }, x/*3*/, { p/*4*/ }) => {
////    var s: number = q/*5*/;
////    var t: number = qq/*6*/;
////    var u: number = p/*7*/;
////    var v: number = x/*8*/;
////    return q; })({ q: 13, qq: 12 }, 1, { p: 14 });
////((a/*9*/, b/*10*/, c/*11*/) => [a/*12*/,b/*13*/,c/*14*/])("foo", 101, false);

goTo.marker('1');
verify.quickInfoIs("var q: number");
goTo.marker('2');
verify.quickInfoIs("var qq: number");
goTo.marker('3');
verify.quickInfoIs("(parameter) x: number");
goTo.marker('4');
verify.quickInfoIs("var p: number");
goTo.marker('5');
verify.quickInfoIs("var q: number");
goTo.marker('6');
verify.quickInfoIs("var qq: number");
goTo.marker('7');
verify.quickInfoIs("var p: number");
goTo.marker('8');
verify.quickInfoIs("(parameter) x: number");
goTo.marker('9');
verify.quickInfoIs("(parameter) a: string");
goTo.marker('10');
verify.quickInfoIs("(parameter) b: number");
goTo.marker('11');
verify.quickInfoIs("(parameter) c: boolean");
goTo.marker('12');
verify.quickInfoIs("(parameter) a: string");
goTo.marker('13');
verify.quickInfoIs("(parameter) b: number");
goTo.marker('14');
verify.quickInfoIs("(parameter) c: boolean");
