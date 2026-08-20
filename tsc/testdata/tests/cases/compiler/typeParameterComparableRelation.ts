// @strict: true
// @noEmit: true

// https://github.com/microsoft/TypeScript/tsc/issues/1462

type StringOrT<T> = T | string

function func<A, B, T extends StringOrT<B>>(thing: T): void {
    thing as A; // Error
}
