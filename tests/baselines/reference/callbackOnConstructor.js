//// [tests/cases/conformance/jsdoc/callbackOnConstructor.ts] ////

//// [callbackOnConstructor.js]
export class Preferences {
  assignability = "no"
  /**
   * @callback ValueGetter_2
   * @param {string} name
   * @returns {boolean|number|string|undefined}
   */
  constructor() {}
}


/** @type {ValueGetter_2} */
var ooscope2 = s => s.length > 0


//// [callbackOnConstructor.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Preferences = void 0;
var Preferences = /** @class */ (function () {
    /**
     * @callback ValueGetter_2
     * @param {string} name
     * @returns {boolean|number|string|undefined}
     */
    function Preferences() {
        this.assignability = "no";
    }
    return Preferences;
}());
exports.Preferences = Preferences;
/** @type {ValueGetter_2} */
var ooscope2 = function (s) { return s.length > 0; };


//// [callbackOnConstructor.d.ts]
export class Preferences {
    assignability: string;
}
