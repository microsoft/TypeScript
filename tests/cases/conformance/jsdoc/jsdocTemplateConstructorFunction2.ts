// @allowJs: true
// @checkJs: true
// @noEmit: true
// @Filename: templateTagWithNestedTypeLiteral.js

/**
 * @template {T}
 * @param {T} t
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
