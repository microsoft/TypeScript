// @strict: true
// @declaration: true
// @outdir: out/
// @checkJs: true
// @filename: typedefScope1.js
function B1() {
    /** @typedef {number} B */
    /** @type {B} */
    var ok1 = 0;
}

function B2() {
    /** @typedef {string} B */
    /** @type {B} */
    var ok2 = 'hi';
}

/** @type {B} */
var notOK = 0;
