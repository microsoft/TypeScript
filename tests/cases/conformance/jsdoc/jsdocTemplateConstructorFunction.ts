// @allowJs: true
// @checkJs: true
// @noEmit: true
// @Filename: templateTagOnConstructorFunctions.js

/**
 * @template U
 * @typedef {(u: U) => U} Id
 */
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
 * @param {Id<T>} id
 */
Zet.prototype.add = function(v, id) {
    this.u = v || this.t
    return id(this.u)
}
var z = new Zet(1)
z.t = 2
z.u = false
