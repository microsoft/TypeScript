// @allowJs: true
// @checkJs: true
// @noEmit: true
// @strict: true
// @noImplicitAny: true
// @Filename: a.js

/** @type {function(string): void} */
const f = (value) => {
    value = 1 // should error
};
/** @type {(s: string) => void} */
function g(s) {
    s = 1 // Should error
}
