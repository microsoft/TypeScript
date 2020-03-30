// @allowJs: true
// @checkJs: true
// @emitDeclarationOnly: true
// @declaration: true
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
Multimap4["prototype"]["addon"] = function() {};
Multimap4["prototype"]["__underscores__"] = function() {};

const map4 = new Multimap4();
map4.get("");
map4["add-on"]();
map4.addon();
map4.__underscores__();
