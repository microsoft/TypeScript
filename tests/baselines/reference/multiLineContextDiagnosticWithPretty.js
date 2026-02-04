//// [tests/cases/compiler/multiLineContextDiagnosticWithPretty.ts] ////

//// [multiLineContextDiagnosticWithPretty.ts]
const x: {c: string} = {
    a: {
        b: '',
    }
};


//// [multiLineContextDiagnosticWithPretty.js]
"use strict";
const x = {
    a: {
        b: '',
    }
};
