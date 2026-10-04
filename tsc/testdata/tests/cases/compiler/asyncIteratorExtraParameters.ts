// @target: esnext
// @noEmit: true
// @noTypesAndSymbols: true

// https://github.com/microsoft/TypeScript/issues/57130
const iter = {
    async *[Symbol.asyncIterator](_: number) {
        yield 0;
    }
};

declare function g(...args: any): any;

async function* f() {
    for await (const _ of iter);

    yield* iter;
}
