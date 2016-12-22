/// <reference path='fourslash.ts' />

////class n {
////    constructor (public x: number, public y: number, private z: string) { }
////}
////var t = new n(0, 1, '');

goTo.eof();
edit.insert('t.');
verify.completionListContains('x');
verify.completionListContains('y');
verify.not.completionListContains('z');
