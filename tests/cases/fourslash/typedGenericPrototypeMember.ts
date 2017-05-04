/// <reference path='fourslash.ts'/>

////class C<T> {
////   foo(x: T) { }
////}
////var /*1*/x = new C<any>(); // Quick Info for x is C<any>
////var /*2*/y = C.prototype; // Quick Info for y is C<{}>

verify.quickInfos({
    1: "var x: C<any>",
    2: "var y: C<any>"
});
