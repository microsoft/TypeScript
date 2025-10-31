// @erasableSyntaxOnly: true
// @allowJs: true
// @checkJs: true
// @noEmit: true

// JavaScript files should not have erasableSyntaxOnly checks
// because they are already "erased" by definition.

// @Filename: bar.cjs
module.exports = {
    a: 1,
}

// @Filename: foo.js
module.exports = {
    b: 2,
}

// @Filename: index.ts
// These should still error because they are in a TypeScript file
import bar = require("./bar.cjs");
import foo = require("./foo.js");
