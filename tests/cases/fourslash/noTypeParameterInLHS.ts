/// <reference path='fourslash.ts'/>

////interface I<T> { }
////class C<T> {}
////var /*1*/i: I<any>;
////var /*2*/c: C<I>;

verify.quickInfos({
    1: "var i: I<any>",
    2: "var c: C<any>"
});
