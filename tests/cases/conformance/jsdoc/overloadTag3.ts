// @checkJs: true
// @allowJs: true
// @strict: true
// @noEmit: true
// @filename: /a.js
/**
 * @template T
 */
export class Foo {
    /**
     * @constructor
     * @overload
     */
    constructor() { }

    /**
     * @param {T} value
     */
    bar(value) { }
}

/** @type {Foo<number>} */
let foo;
foo = new Foo();
