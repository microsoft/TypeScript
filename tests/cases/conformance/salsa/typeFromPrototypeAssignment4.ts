// @allowJs: true
// @checkJs: true
// @declaration: true
// @emitDeclarationOnly: true
// @outDir: out
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

Multimap4["prototype"]["add-on"] = function() {};

const map4 = new Multimap4();
map4.get("");
map4["add-on"]();
