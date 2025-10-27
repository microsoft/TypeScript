/// <reference path='fourslash.ts'/>

////namespace M {
////    export namespace N {
////        export class C<T> { }
////        export class D { }
////    }
////}
////import d = M.N;
////var /*1*/aa: d.C<number>;
////var /*2*/bb: d.D;

verify.quickInfos({
    1: "var aa: d.C<number>",
    2: "var bb: d.D"
});
