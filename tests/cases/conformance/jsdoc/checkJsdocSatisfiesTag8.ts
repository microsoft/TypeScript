// @noEmit: true
// @allowJS: true
// @checkJs: true

// @filename: /a.js

/** @typedef {Object.<string, boolean>} Facts */

// Should be able to detect a failure here
const x = /** @satisfies {Facts} */ ({
    m: true,
    s: "false"
})
