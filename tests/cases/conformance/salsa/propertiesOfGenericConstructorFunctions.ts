// @Filename: propertiesOfGenericConstructorFunctions.js
// @allowJs: true
// @checkJs: true
// @noEmit: true

/**
 * @template {string} K
 * @template V
 * @param {string} ik
 * @param {V} iv
 */
function Multimap(ik, iv) {
    /** @type {{ [s: string]: V }} */
    this._map = {};
    // without type annotation
    this._map2 = { [ik]: iv };
};

/** @type {Multimap<"a" | "b", number>} with type annotation */
const map = new Multimap("a", 1);
// without type annotation
const map2 = new Multimap("m", 2);

/** @type {number} */
var n = map._map['hi']
/** @type {number} */
var n = map._map2['hi']
/** @type {number} */
var n = map2._map['hi']
/** @type {number} */
var n = map._map2['hi']
