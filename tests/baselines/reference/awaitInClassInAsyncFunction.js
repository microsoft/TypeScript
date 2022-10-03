//// [awaitInClassInAsyncFunction.ts]
// https://github.com/microsoft/TypeScript/issues/34887

async function bar() {
    return 2;
}

async function foo() {
    return new class {
        baz = await bar();
    };
}


//// [awaitInClassInAsyncFunction.js]
// https://github.com/microsoft/TypeScript/issues/34887
async function bar() {
    return 2;
}
async function foo() {
    return new class {
        constructor() {
            this.baz = await bar();
        }
    };
}
