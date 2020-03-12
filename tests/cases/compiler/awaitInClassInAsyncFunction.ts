// @target: esnext
// https://github.com/microsoft/TypeScript/issues/34887

async function bar() {
    return 2;
}

async function foo() {
    return new class {
        baz = await bar();
    };
}
