//// [tests/cases/conformance/statements/for-ofStatements/ES5For-of16.ts] ////

//// [ES5For-of16.ts]
for (let v of []) {
    v;
    for (let v of []) {
        var x = v;
        v++;
    }
}

//// [ES5For-of16.js]
for (let v of []) {
    v;
    for (let v of []) {
        var x = v;
        v++;
    }
}
