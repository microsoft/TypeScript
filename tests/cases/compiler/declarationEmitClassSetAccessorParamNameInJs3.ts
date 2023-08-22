// @declaration: true
// @emitDeclarationOnly: true
// @allowJs: true

// @filename: foo.js

export class Foo {
    /**
     * Bar.
     *
     * @param {{ prop: string | undefined }} baz Baz.
     */
    set bar({ prop = 'foo' }) {}
}
