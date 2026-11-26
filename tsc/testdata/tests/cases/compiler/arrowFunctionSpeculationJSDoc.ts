// @allowJs: true
// @checkJs: true
// @noImplicitAny: false
// @noEmit: true

// @filename: types.d.ts
export interface Key {}

// @filename: index.js
export {};
const key = "k";
const result = (a) => ({
    [String((b) => ({
        [String((c) => ({ [String(key)]: 0 }))]: 0
    }))]: 0,
    /** @typedef {number} Local */
    typedef() {},
    /** @callback Callback */
    callback() {},
    /** @import {Key} from "./types" */
    imported() {}
});

/** @type {Local} */
const local = 1;
/** @type {Callback} */
const callback = () => {};
/** @type {Key} */
const imported = {};
