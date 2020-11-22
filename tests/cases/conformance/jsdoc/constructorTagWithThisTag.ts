// @allowJs: true
// @noEmit: true
// @checkJs: true
// @Filename: classthisboth.js

/**
 * @class
 * @this {{ e: number, m: number }}
 * this-tag should win, both 'e' and 'm' should be defined.
 */
function C() {
    this.e = this.m + 1
}
