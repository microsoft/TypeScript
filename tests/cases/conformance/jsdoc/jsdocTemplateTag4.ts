// @noEmit: true
// @allowJs: true
// @checkJs: true
// @strict: true
// @Filename: a.js

/**
 * Should work for function declarations
 * @constructor
 * @template {string} K
 * @template V
 */
function Multimap() {
    /** @type {Object<string, V>} TODO: Remove the prototype from the fresh object */
    this._map = {};
};

/**
 * @param {K} key the key ok
 * @returns {V} the value ok
 */
Multimap.prototype.get = function (key) {
    return this._map[key + ''];
}

/**
 * Should work for initialisers too
 * @constructor
 * @template {string} K
 * @template V
 */
var Multimap2 = function() {
    /** @type {Object<string, V>} TODO: Remove the prototype from the fresh object */
    this._map = {};
};

/**
 * @param {K} key the key ok
 * @returns {V} the value ok
 */
Multimap2.prototype.get = function (key) {
    return this._map[key + ''];
}

var Ns = {};
/**
 * Should work for expando-namespaced initialisers too
 * @constructor
 * @template {string} K
 * @template V
 */
Ns.Multimap3 = function() {
    /** @type {Object<string, V>} TODO: Remove the prototype from the fresh object */
    this._map = {};
};

/**
 * @param {K} key the key ok
 * @returns {V} the value ok
 */
Ns.Multimap3.prototype.get = function (key) {
    return this._map[key + ''];
}
