// @declaration: true
// @emitDeclarationOnly: true
// @allowJs: true

// @filename: foo.js

// https://github.com/microsoft/TypeScript/issues/55391

export class Foo {
    /**
     * Bar.
     *
     * @param {string} baz Baz.
     */
    set bar(baz) {}
}
