//// [tests/cases/conformance/classes/awaitAndYieldInProperty.ts] ////

//// [awaitAndYieldInProperty.ts]
async function* test(x: Promise<string>) {
    class C {
        [await x] = await x;
        static [await x] = await x;

        [yield 1] = yield 2;
        static [yield 3] = yield 4;
    }

    return class {
        [await x] = await x;
        static [await x] = await x;

        [yield 1] = yield 2;
        static [yield 3] = yield 4;
    }
}

//// [awaitAndYieldInProperty.js]
async function* test(x) {
    class C {
        [await x] = await x;
        static [await x] = await x;
        [yield 1] = yield 2;
        static [yield 3] = yield 4;
    }
    return class {
        [await x] = await x;
        static [await x] = await x;
        [yield 1] = yield 2;
        static [yield 3] = yield 4;
    };
}
