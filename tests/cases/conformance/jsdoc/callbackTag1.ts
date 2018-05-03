// @noEmit: true
// @allowJs: true
// @checkJs: true
// @Filename: cb.js

/** @callback Sid
 * @param {string} s
 * @returns {string} What were you expecting
 */
var x = 1

/** @type {Sid} smallId */
var sid = s => s + "!";


/** @type {NoReturn} */
var noreturn = obj => void obj.title

/**
 * @callback NoReturn
 * @param {{ e: number, m: number, title: string }} s - Knee deep, shores, etc
 */
