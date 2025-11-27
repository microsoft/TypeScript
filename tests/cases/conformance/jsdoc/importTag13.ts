// @checkJs: true
// @allowJs: true
// @noEmit: true

// @filename: /types.ts
export interface Foo {
    a: number;
}

// @filename: /foo.js
/** @import x = require("types") */
