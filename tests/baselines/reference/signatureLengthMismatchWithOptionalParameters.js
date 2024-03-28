//// [tests/cases/compiler/signatureLengthMismatchWithOptionalParameters.ts] ////

//// [signatureLengthMismatchWithOptionalParameters.ts]
function callee(n: number | undefined, m: string) { }

function caller(arg: (n?: number) => void) { }

caller(callee);


//// [signatureLengthMismatchWithOptionalParameters.js]
function callee(n, m) { }
function caller(arg) { }
caller(callee);
