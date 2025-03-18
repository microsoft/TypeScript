//// [tests/cases/compiler/asyncImportNestedYield.ts] ////

//// [asyncImportNestedYield.ts]
async function* foo() {
    import((await import(yield "foo")).default);
}

//// [asyncImportNestedYield.js]
async function* foo() {
    Promise.resolve(`${(await Promise.resolve(`${yield "foo"}`).then(s => require(s))).default}`).then(s => require(s));
}
