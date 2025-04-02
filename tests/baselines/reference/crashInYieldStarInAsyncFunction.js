//// [tests/cases/compiler/crashInYieldStarInAsyncFunction.ts] ////

//// [crashInYieldStarInAsyncFunction.ts]
// https://github.com/microsoft/TypeScript/issues/53145
var obj = {
    [Symbol.asyncIterator]() {
        return {
            next() {
                return { then() { } };
            }
        };
    }
};

async function* g() {
    yield* obj;
}

//// [crashInYieldStarInAsyncFunction.js]
// https://github.com/microsoft/TypeScript/issues/53145
var obj = {
    [Symbol.asyncIterator]() {
        return {
            next() {
                return { then() { } };
            }
        };
    }
};
async function* g() {
    yield* obj;
}
