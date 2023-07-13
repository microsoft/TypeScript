//// [tests/cases/conformance/salsa/typeFromPrototypeAssignment4.ts] ////

//// [a.js]
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




//// [a.d.ts]
declare function Multimap4(): void;
declare class Multimap4 {
    _map: {};
    "add-on"(): void;
    addon(): void;
    __underscores__(): void;
    /**
     * @param {string} key
     * @returns {number} the value ok
     */
    get(key: string): number;
}
declare const map4: Multimap4;
