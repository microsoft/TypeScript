/// <reference path='fourslash.ts' />

////interface A { (): B; };
////declare var a: A;
////var xx = a();
////
////interface B { (): C; };
////declare var b: B;
////var yy = b();
////
////interface C { (): A; };
////declare var c: C;
////var zz = c();
////
////x/*B*/x = y/*C*/y;

goTo.marker('B');
verify.quickInfoIs('(var) xx: B');

goTo.marker('C');
verify.quickInfoIs('(var) yy: C');
