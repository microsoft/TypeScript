// @strict: true
// @noEmit: true

// https://github.com/microsoft/TypeScript/issues/55212

const enum Foo {
    a = 1,
}

export const v = Foo["1"]
