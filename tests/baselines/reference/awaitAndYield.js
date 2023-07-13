//// [tests/cases/conformance/enums/awaitAndYield.ts] ////

//// [awaitAndYield.ts]
async function* test(x: Promise<number>) {
    enum E {
        foo = await x,
        baz = yield 1,
    }
}

//// [awaitAndYield.js]
async function* test(x) {
    let E;
    (function (E) {
        E[E["foo"] = await x] = "foo";
        E[E["baz"] = yield 1] = "baz";
    })(E || (E = {}));
}
