//// [tests/cases/conformance/statements/for-ofStatements/ES5For-of15.ts] ////

//// [ES5For-of15.ts]
for (let v of []) {
    v;
    for (const v of []) {
        var x = v;
    }
}

//// [ES5For-of15.js]
for (let v of []) {
    v;
    for (const v of []) {
        var x = v;
    }
}
