//// [tests/cases/conformance/statements/for-ofStatements/ES5For-of20.ts] ////

//// [ES5For-of20.ts]
for (let v of []) {
    let v;
    for (let v of [v]) {
        const v;
    }
}

//// [ES5For-of20.js]
for (let v of []) {
    let v;
    for (let v of [v]) {
        const v;
    }
}
