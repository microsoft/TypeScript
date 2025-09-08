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
export {};
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
export type PropName = string | number | symbol;
/**
 * Callback
 */
export type NumberToStringCb = (a: number) => string;
export type MixinName<T> = T & {
    name: string;
};
/**
 * Identity function
 */
export type Identity<T> = (x: T) => T;
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
export function doTheThing(x: number): SomeType;
export class ExportedThing {
    z: string;
}
declare class LocalThing {
    y: string;
}
export {};
