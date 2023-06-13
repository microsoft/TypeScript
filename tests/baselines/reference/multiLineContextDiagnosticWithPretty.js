//// [tests/cases/compiler/multiLineContextDiagnosticWithPretty.ts] ////

//// [multiLineContextDiagnosticWithPretty.ts]
const x: {c: string} = {
    a: {
        b: '',
    }
};


//// [multiLineContextDiagnosticWithPretty.js]
var x = {
    a: {
        b: '',
    }
};
