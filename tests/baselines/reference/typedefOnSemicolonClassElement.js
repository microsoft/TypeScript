//// [tests/cases/conformance/jsdoc/typedefOnSemicolonClassElement.ts] ////

//// [typedefOnSemicolonClassElement.js]
export class Preferences {
  /** @typedef {string} A */
  ;
  /** @type {A} */
  a = 'ok'
}


//// [typedefOnSemicolonClassElement.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Preferences = void 0;
var Preferences = /** @class */ (function () {
    function Preferences() {
        /** @type {A} */
        this.a = 'ok';
    }
    /** @typedef {string} A */
    ;
    return Preferences;
}());
exports.Preferences = Preferences;


//// [typedefOnSemicolonClassElement.d.ts]
export class Preferences {
    /** @type {A} */
    a: string;
}
