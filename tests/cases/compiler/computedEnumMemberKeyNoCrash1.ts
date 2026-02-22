// @strict: true
// @noEmit: true

// https://github.com/microsoft/TypeScript/issues/63173

declare const enum E {
    [foo] = 1,
    A,
    foo = 10,
}
E.A.toString();
