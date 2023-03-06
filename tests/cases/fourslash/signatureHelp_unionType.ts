/// <reference path="fourslash.ts" />

////declare const a: (fn?: ((x: string) => string) | ((y: number) => number)) => void;
////declare const b: (x: string | number) => void;
////
////interface Callback {
////    (x: string): string;
////    (x: number): number;
////    (x: string | number): string | number;
////}
////declare function c(callback: Callback): void;

////a((/*1*/) => {
////    return undefined;
////});
////
////b(/*2*/);
////
////c((/*3*/) => {});

verify.baselineSignatureHelp();
