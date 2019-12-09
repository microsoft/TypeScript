// @noEmit: true
// @allowJs: true
// @checkJs: true
// @Filename: ex.d.ts
export var config: {}

// @Filename: test.js
/** @param {import('./ex')} a */
function demo(a) {
    a.config
}
