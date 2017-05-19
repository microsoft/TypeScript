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


goTo.marker('1');
verify.currentParameterHelpArgumentNameIs("n");
goTo.marker('2');
verify.currentParameterHelpArgumentNameIs("n");
goTo.marker('3');
verify.currentParameterHelpArgumentNameIs("n");
goTo.marker('4');
verify.currentParameterHelpArgumentNameIs("x");
goTo.marker('5');
verify.currentParameterHelpArgumentNameIs("x");
goTo.marker('6');
verify.currentParameterHelpArgumentNameIs("x");
