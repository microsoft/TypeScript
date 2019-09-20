// @noEmit: true
// @allowJs: true
// @checkJs: true
// @Filename: a.js

function Multimap4() {
  this._map = {};
};

Multimap4["prototype"] = {
  /**
   * @param {string} key
   * @returns {number} the value ok
   */
  get(key) {
    return this._map[key + ''];
  }
};

Multimap4["prototype"]["addon"] = function() {};

const map4 = new Multimap4();
map4.get("");
map4.addon();
