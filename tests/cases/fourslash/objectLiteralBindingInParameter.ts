/// <reference path="fourslash.ts"/>

////interface I { x1: number; x2: string }
////function f(cb: (ev: I) => any) { }
////f(({/*1*/}) => 0);

////[<I>null].reduce(({/*2*/}, b) => b);

goTo.marker("1");
verify.completionListContains("x1");
verify.completionListContains("x2");

goTo.marker("2");
verify.completionListContains("x1");
verify.completionListContains("x2");