/// <reference path='fourslash.ts'/>

////declare function f<T = boolean>(x: T, y: string): T;
////f<number>(/*1*/);
////f(/*2*/);

goTo.marker("1");
verify.currentSignatureHelpIs("f(x: number, y: string): number");

goTo.marker("2");
verify.currentSignatureHelpIs("f<T = boolean>(x: T, y: string): T");
