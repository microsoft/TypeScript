// @checkJs: true
// @allowJs: true
// @noEmit: true
// @Filename: test.js

/**
 * @typedef {(a: string, b: number) => void} Foo
 */

class C {
    /** @type {Foo} */
    foo(a, b) {}
}
