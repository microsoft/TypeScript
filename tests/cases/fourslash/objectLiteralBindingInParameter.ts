/// <reference path="fourslash.ts"/>

////interface I { x1: number; x2: string }
////function f(cb: (ev: I) => any) { }
////f(({/*1*/}) => 0);

////[<I>null].reduce(({/*2*/}, b) => b);

////interface Foo {
////    m(x: { x1: number, x2: number }): void;
////    prop: I;
////}
////let x: Foo = {
////    m({ /*3*/ }) {
////    },
////    get prop(): I { return undefined; },
////    set prop({ /*4*/ }) {
////    }
////};

goTo.marker("1");
verify.completionListContains("x1");
verify.completionListContains("x2");

goTo.marker("2");
verify.completionListContains("x1");
verify.completionListContains("x2");

goTo.marker("3");
verify.completionListContains("x1");
verify.completionListContains("x2");

goTo.marker("4");
verify.completionListContains("x1");
verify.completionListContains("x2");