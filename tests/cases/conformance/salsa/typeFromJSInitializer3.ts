// @allowJs: true
// @checkJs: true
// @noEmit: true
// @strictNullChecks: false
// @noImplicitAny: true
// @Filename: a.js

/** @type {() => undefined} */
function f1() {
    return undefined;
}
const a = f1()

/** @type {() => null} */
function f2() {
    return null;
}
const b = f2()
