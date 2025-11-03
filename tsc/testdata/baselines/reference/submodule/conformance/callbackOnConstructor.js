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
class Preferences {
    assignability = "no";
    /**
     * @callback ValueGetter_2
     * @param {string} name
     * @returns {boolean|number|string|undefined}
     */
    constructor() { }
}
exports.Preferences = Preferences;
/** @type {ValueGetter_2} */
var ooscope2 = s => s.length > 0;


//// [callbackOnConstructor.d.ts]
export type ValueGetter_2 = (name: string) => boolean | number | string | undefined;
export declare class Preferences {
    assignability: string;
    /**
     * @callback ValueGetter_2
     * @param {string} name
     * @returns {boolean|number|string|undefined}
     */
    constructor();
}
