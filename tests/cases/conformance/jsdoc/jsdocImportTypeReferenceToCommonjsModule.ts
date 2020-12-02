// @noEmit: true
// @allowJs: true
// @checkJs: true
// @Filename: ex.d.ts
declare var config: {
    fix: boolean
}
export = config;

// @Filename: test.js
/** @param {import('./ex')} a */
function demo(a) {
    a.fix
}
