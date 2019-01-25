// @pretty: true
// @noEmit: true
// @allowJs: true
// @checkJs: true
// @Filename: mod1.js

/** @typedef {number} Foo */
class Bar {}

// @Filename: mod2.js
class Foo { } // should error
const Bar = 3;
