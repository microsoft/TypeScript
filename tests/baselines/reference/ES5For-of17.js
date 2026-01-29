//// [tests/cases/conformance/statements/for-ofStatements/ES5For-of17.ts] ////

//// [ES5For-of17.ts]
for (let v of []) {
    v;
    for (let v of [v]) {
        var x = v;
        v++;
    }
}

//// [ES5For-of17.js]
for (let v of []) {
    v;
    for (let v of [v]) {
        var x = v;
        v++;
    }
}
