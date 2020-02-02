// @allowJs: true
// @checkJs: true
// @noEmit: true

// @Filename: /a.js
class A {
    /** @return {number} */
    method() { throw new Error(); }
}
/** @implements A */
class B  {
    method() { return 0 }
}

/** @implements A */
class B2  {
    /** @return {string} */
    method() { return "" }
}

/** @implements A */
class B3  {
}
