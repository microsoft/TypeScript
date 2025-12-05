// @target: esnext
// @module: esnext
// @lib: esnext
// @noTypesAndSymbols: true

declare namespace N {
    await using x: { [Symbol.asyncDispose](): Promise<void> };
    await using y: null;
}
declare module 'M' {
    await using x: { [Symbol.asyncDispose](): Promise<void> };
    await using y: null;
}
