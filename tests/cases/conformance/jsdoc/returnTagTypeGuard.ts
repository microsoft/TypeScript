// @noEmit: true
// @allowJs: true
// @checkJs: true
// @lib: esnext
// @Filename: bug25127.js
class Entry {
    constructor() {
        this.c = 1
    }
    /**
     * @param {any} x
     * @return {this is Entry}
     */
    isInit(x) {
        return true
    }
}
class Group {
    constructor() {
        this.d = 'no'
    }
    /**
     * @param {any} x
     * @return {false}
     */
    isInit(x) {
        return false
    }
}
/** @param {Entry | Group} chunk */
function f(chunk) {
    let x = chunk.isInit(chunk) ? chunk.c : chunk.d
    return x
}

/**
 * @param {any} value
 * @return {value is boolean}
 */
function isBoolean(value) {
    return typeof value === "boolean";
}

/** @param {boolean | number} val */
function foo(val) {
    if (isBoolean(val)) {
        val;
    }
}

/**
 * @callback Cb
 * @param {unknown} x
 * @return {x is number}
 */

/** @type {Cb} */
function isNumber(x) { return typeof x === "number" }

/** @param {unknown} x */
function g(x) {
    if (isNumber(x)) {
        x * 2;
    }
}
