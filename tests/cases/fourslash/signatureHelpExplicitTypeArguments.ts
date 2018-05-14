/// <reference path='fourslash.ts'/>

////declare function f<T = boolean, U = string>(x: T, y: U): T;
////f<number, string>(/*1*/);
////f(/*2*/);
////f<number>(/*3*/);
////f<number, string, boolean>(/*4*/);

verify.signatureHelp(
    { marker: "1", text: "f(x: number, y: string): number" },
    { marker: "2", text: "f<T = boolean, U = string>(x: T, y: U): T" },
    // too few -- fill in rest with {}
    { marker: "3", text: "f(x: number, y: {}): number" },
    // too many -- ignore extra type arguments
    { marker: "4", text: "f(x: number, y: string): number" },
);
