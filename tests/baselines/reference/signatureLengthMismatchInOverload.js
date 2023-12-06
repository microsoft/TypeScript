//// [tests/cases/compiler/signatureLengthMismatchInOverload.ts] ////

//// [signatureLengthMismatchInOverload.ts]
function f(callback: (arg: string, arg2: string) => void): void;
function f(callback: (arg: number) => void): void;
function f(callback: unknown) { }

f((arg: number, arg2: number) => {});


//// [signatureLengthMismatchInOverload.js]
function f(callback) { }
f(function (arg, arg2) { });
