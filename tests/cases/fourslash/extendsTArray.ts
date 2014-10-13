/// <reference path='fourslash.ts'/>

////interface I1<T> {
////    (a: T): T;
////}
////interface I2<T> extends I1<T[]> {
////    b: T;
////}
////var x: I2<Date>;
////var /**/y = x(undefined); // Typeof y should be Date[]
////y.length;

goTo.marker();
verify.quickInfoIs('(var) y: Date[]');
verify.numberOfErrorsInCurrentFile(0);
