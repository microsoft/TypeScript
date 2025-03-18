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
        E["foo"] = await x;
        if (typeof E.foo !== "string") E[E.foo] = "foo";
        E["baz"] = (yield 1);
        if (typeof E.baz !== "string") E[E.baz] = "baz";
    })(E || (E = {}));
}
