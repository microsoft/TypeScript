//// [tests/cases/compiler/signatureLengthMismatchInOverload.ts] ////

//// [signatureLengthMismatchInOverload.ts]
function f(callback: (arg: string, arg2: string) => void): void;
function f(callback: (arg: number) => void): void;
function f(callback: unknown) { }

f((arg: number, arg2: number) => {});


//// [signatureLengthMismatchInOverload.js]
"use strict";
function f(callback) { }
f((arg, arg2) => { });
