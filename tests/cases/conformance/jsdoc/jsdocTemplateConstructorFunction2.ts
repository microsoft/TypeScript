// @allowJs: true
// @checkJs: true
// @noEmit: true
// @Filename: templateTagWithNestedTypeLiteral.js

/**
 * @param {T} t
 * @template T
 */
function Zet(t) {
    /** @type {T} */
    this.u
    this.t = t
}
/**
 * @param {T} v
 * @param {object} o
 * @param {T} o.nested
 */
Zet.prototype.add = function(v, o) {
    this.u = v || o.nested
    return this.u
}
var z = new Zet(1)
z.t = 2
z.u = false
/** @type {number} */
let answer = z.add(3, { nested: 4 })

// lookup in typedef should not crash the compiler, even when the type is unknown
/**
 * @typedef {Object} A
 * @property {T} value
 */
/** @type {A} */
const options = { value: null };
