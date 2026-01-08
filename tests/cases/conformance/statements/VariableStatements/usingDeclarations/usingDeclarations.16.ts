// @target: esnext
// @module: esnext
// @lib: esnext
// @noTypesAndSymbols: true

declare namespace N {
    using x: { [Symbol.dispose](): void };
    using y: null;
}
declare module 'M' {
    using x: { [Symbol.dispose](): void };
    using y: null;
}
