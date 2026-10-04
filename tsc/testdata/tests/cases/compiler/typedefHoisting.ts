// @allowJs: true
// @checkJs: true
// @declaration: true

// @filename: x.js
class C {
    /** @import {Bar} from "./y" */
    /** @typedef {Bar[]} Bars */
    /** @type {Bars} */
    foo = ["abc", "def"]
    bar(/** @type {Bar} */ x) {
        return x
    }
}

// @filename: y.js
/** @typedef {string} Bar */
export {}
