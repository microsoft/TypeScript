// @target: ES5
// @noEmitHelpers: true
// @lib: es5,es2015.promise
// @allowJs: true
// @checkJs: true
// @noEmit: true

// @filename: /types.d.ts
declare class Thenable { then(): void; }

// @filename: /a.js
/**
 * @callback T1
 * @param {string} str
 * @returns {string}
 */

/**
 * @callback T2
 * @param {string} str
 * @returns {Promise<string>}
 */

/**
 * @callback T3
 * @param {string} str
 * @returns {Thenable}
 */

/**
 * @param {string} str
 * @returns {string}
 */
const f1 = async str => {
    return str;
}

/** @type {T1} */
const f2 = async str => {
    return str;
}

/**
 * @param {string} str
 * @returns {Promise<string>}
 */
const f3 = async str => {
    return str;
}

/** @type {T2} */
const f4 = async str => {
    return str;
}

/** @type {T3} */
const f5 = async str => {
    return str;
}
