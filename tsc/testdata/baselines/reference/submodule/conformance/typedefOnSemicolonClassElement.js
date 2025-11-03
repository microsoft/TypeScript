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
class Preferences {
    /** @typedef {string} A */
    ;
    /** @type {A} */
    a = 'ok';
}
exports.Preferences = Preferences;


//// [typedefOnSemicolonClassElement.d.ts]
export type A = string;
export declare class Preferences {
    /** @type {A} */
    a: A;
}
