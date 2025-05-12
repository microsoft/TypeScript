// @target: esnext
// @noEmit: true
// @noTypesAndSymbols: true

// https://github.com/microsoft/TypeScript/issues/57130
const iter = {
    *[Symbol.iterator](_: number) {
        yield 0;
    }
};

declare function g(...args: any): any;

function* f() {
    for (const _ of iter);

    yield* iter;

    [...iter]

    g(...iter);
}
