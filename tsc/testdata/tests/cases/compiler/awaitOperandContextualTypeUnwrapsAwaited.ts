// @strict: true
// @target: es2017
// @noEmit: true

declare function make<U>(): PromiseLike<U>;

async function f<T extends number>(): Promise<Awaited<T>> {
    return await make();
}

async function g<T extends number>() {
    const x: Awaited<T> = await make();
    return x;
}
