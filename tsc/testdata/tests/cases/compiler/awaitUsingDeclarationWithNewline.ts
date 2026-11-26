// @target: esnext
// @lib: esnext

declare const resource: AsyncDisposable;
declare const resources: Iterable<AsyncDisposable>;

async function statement() {
    await
    using x = resource;
}

async function forStatement() {
    for (await
        using x = resource; ;) {}
}

async function forOfStatement() {
    for (await
        using x of resources) {}
}
