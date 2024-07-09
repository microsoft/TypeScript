/// <reference path='fourslash.ts' />
////class Foo<T> {
////    public implicitAny(n: number) {
////    }
////    public explicitThis(this: this, n: number) {
////        console.log(this);
////    }
////    public explicitClass(this: Foo<T>, n: number) {
////        console.log(this);
////    }
////}
////
////function implicitAny(x: number): void {
////    return this;
////}
////function explicitVoid(this: void, x: number): void {
////    return this;
////}
////function explicitLiteral(this: { n: number }, x: number): void {
////    console.log(this);
////}
////let foo = new Foo<number>();
////foo.implicitAny(/*1*/);
////foo.explicitThis(/*2*/);
////foo.explicitClass(/*3*/);
////implicitAny(/*4*/12);
////explicitVoid(/*5*/13);
////let o = { n: 14, m: explicitLiteral };
////o.m(/*6*/);

verify.signatureHelp(
    { marker: ["1", "2", "3"], parameterName: "n" },
    { marker: ["4", "5", "6"], parameterName: "x" },
);
