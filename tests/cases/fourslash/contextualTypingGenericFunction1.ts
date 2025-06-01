/// <reference path='fourslash.ts'/>

////var obj: { f<T>(x: T): T } = { f: <S>(/*1*/x) => x };
////var obj2: <T>(x: T) => T = <S>(/*2*/x) => x;
////
////class C<T> {
////    obj: <T>(x: T) => T
////}
////var c = new C();
////c.obj = <S>(/*3*/x) => x;

verify.quickInfos({
    1: "(parameter) x: T",
    2: "(parameter) x: T",
    3: "(parameter) x: T"
});
