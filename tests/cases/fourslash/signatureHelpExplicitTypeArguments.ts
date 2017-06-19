/// <reference path='fourslash.ts'/>

////declare function f<T = boolean, U = string>(x: T, y: U): T;
////f<number, string>(/*1*/);
////f(/*2*/);
////f<number>(/*3*/);
////f<number, string, boolean>(/*4*/);

goTo.marker("1");
verify.currentSignatureHelpIs("f(x: number, y: string): number");

goTo.marker("2");
verify.currentSignatureHelpIs("f<T = boolean, U = string>(x: T, y: U): T");

goTo.marker("3");
// too few -- fill in rest with {}
verify.currentSignatureHelpIs("f(x: number, y: {}): number");

goTo.marker("4");
// too many -- ignore extra type arguments
verify.currentSignatureHelpIs("f(x: number, y: string): number");
