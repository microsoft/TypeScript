// @noEmit: true
// @allowJs: true
// @checkJs: true
// @Filename: bug26885.js
// @strict: true

function Multimap3() {
    this._map = {};
};

Multimap3.prototype = {
    /**
     * @param {string} key
     * @returns {number} the value ok
     */
    get(key) {
        return this._map[key + ''];
    }
}

/** @type {Multimap3} */
const map = new Multimap3();
const n = map.get('hi')