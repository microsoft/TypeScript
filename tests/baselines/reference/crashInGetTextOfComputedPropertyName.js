//// [tests/cases/compiler/crashInGetTextOfComputedPropertyName.ts] ////

//// [crashInGetTextOfComputedPropertyName.ts]
// https://github.com/Microsoft/TypeScript/issues/29006
export interface A { type: 'a' }
export interface B { type: 'b' }
export type AB = A | B

const itemId = 'some-id'

// --- test on first level ---
const items: { [id: string]: AB } = {}
const { [itemId]: itemOk1 } = items
typeof itemOk1 // pass

// --- test on second level ---
interface ObjWithItems {
    items: {[s: string]: AB}
}
const objWithItems: ObjWithItems = { items: {}}

const itemOk2 = objWithItems.items[itemId]
typeof itemOk2 // pass

const {
    items: { [itemId]: itemWithTSError } = {} /*happens when default value is provided*/
} = objWithItems

// in order to re-produce the error, uncomment next line:
typeof itemWithTSError // :(

// will result in:
// Error from compilation: TypeError: Cannot read property 'charCodeAt' of undefined  TypeError: Cannot read property 'charCodeAt' of undefined

//// [crashInGetTextOfComputedPropertyName.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var itemId = 'some-id';
// --- test on first level ---
var items = {};
var _a = items, _b = itemId, itemOk1 = _a[_b];
typeof itemOk1; // pass
var objWithItems = { items: {} };
var itemOk2 = objWithItems.items[itemId];
typeof itemOk2; // pass
var _c = objWithItems, _d = _c.items /*happens when default value is provided*/, _e = _d === void 0 ? {} : _d /*happens when default value is provided*/, _f = itemId, itemWithTSError = _e[_f];
// in order to re-produce the error, uncomment next line:
typeof itemWithTSError; // :(
// will result in:
// Error from compilation: TypeError: Cannot read property 'charCodeAt' of undefined  TypeError: Cannot read property 'charCodeAt' of undefined
