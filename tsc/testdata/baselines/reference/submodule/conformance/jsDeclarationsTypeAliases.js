//// [tests/cases/conformance/jsdoc/declarations/jsDeclarationsTypeAliases.ts] ////

//// [index.js]
export {}; // flag file as module
/**
 * @typedef {string | number | symbol} PropName 
 */

/**
 * Callback
 *
 * @callback NumberToStringCb
 * @param {number} a
 * @returns {string}
 */

/**
 * @template T
 * @typedef {T & {name: string}} MixinName 
 */

/**
 * Identity function
 *
 * @template T
 * @callback Identity
 * @param {T} x
 * @returns {T}
 */

//// [mixed.js]
/**
 * @typedef {{x: string} | number | LocalThing | ExportedThing} SomeType
 */
/**
 * @param {number} x
 * @returns {SomeType}
 */
function doTheThing(x) {
    return {x: ""+x};
}
class ExportedThing {
    z = "ok"
}
module.exports = {
    doTheThing,
    ExportedThing,
};
class LocalThing {
    y = "ok"
}


//// [index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @typedef {string | number | symbol} PropName
 */
/**
 * Callback
 *
 * @callback NumberToStringCb
 * @param {number} a
 * @returns {string}
 */
/**
 * @template T
 * @typedef {T & {name: string}} MixinName
 */
/**
 * Identity function
 *
 * @template T
 * @callback Identity
 * @param {T} x
 * @returns {T}
 */
//// [mixed.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @typedef {{x: string} | number | LocalThing | ExportedThing} SomeType
 */
/**
 * @param {number} x
 * @returns {SomeType}
 */
function doTheThing(x) {
    return { x: "" + x };
}
class ExportedThing {
    z = "ok";
}
module.exports = {
    doTheThing,
    ExportedThing,
};
class LocalThing {
    y = "ok";
}


//// [index.d.ts]
export {};
export type PropName = string | number | symbol;
export type NumberToStringCb = (a: number) => string;
export type MixinName<T> = T & {
    name: string;
};
export type Identity<T> = (x: T) => T;
/**
 * @typedef {string | number | symbol} PropName
 */
/**
 * Callback
 *
 * @callback NumberToStringCb
 * @param {number} a
 * @returns {string}
 */
/**
 * @template T
 * @typedef {T & {name: string}} MixinName
 */
/**
 * Identity function
 *
 * @template T
 * @callback Identity
 * @param {T} x
 * @returns {T}
 */
//// [mixed.d.ts]
export type SomeType = {
    x: string;
} | number | LocalThing | ExportedThing;
/**
 * @typedef {{x: string} | number | LocalThing | ExportedThing} SomeType
 */
/**
 * @param {number} x
 * @returns {SomeType}
 */
declare function doTheThing(x: number): SomeType;
declare class ExportedThing {
    z: string;
}
declare const _default: {
    doTheThing: typeof doTheThing;
    ExportedThing: typeof ExportedThing;
};
export = _default;
declare class LocalThing {
    y: string;
}
