//// [bug39372.js]
/** @typedef {ReadonlyArray<Json>} JsonArray */
/** @typedef {{ readonly [key: string]: Json }} JsonRecord */
/** @typedef {boolean | number | string | null | JsonRecord | JsonArray | readonly []} Json */


//// [bug39372.js]
/** @typedef {ReadonlyArray<Json>} JsonArray */
/** @typedef {{ readonly [key: string]: Json }} JsonRecord */
/** @typedef {boolean | number | string | null | JsonRecord | JsonArray | readonly []} Json */


//// [bug39372.d.ts]
type JsonArray = readonly Json[];
type JsonRecord = {
    readonly [key: string]: Json;
};
type Json = string | number | boolean | JsonRecord | JsonArray | readonly [];
