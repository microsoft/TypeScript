//// [tests/cases/compiler/signatureLengthMismatchCall.ts] ////

//// [signatureLengthMismatchCall.ts]
function takesCallback(fn: (a: number) => void) {
  // ...
}

takesCallback((a: number, b: number) => {});


//// [signatureLengthMismatchCall.js]
function takesCallback(fn) {
    // ...
}
takesCallback(function (a, b) { });
