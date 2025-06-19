//// [tests/cases/conformance/jsdoc/declarations/jsDeclarationsImportNamespacedType.ts] ////

//// [file.js]
import { dummy } from './mod1'
/** @type {import('./mod1').Dotted.Name} - should work */
var dot2

//// [mod1.js]
/** @typedef {number} Dotted.Name */
export var dummy = 1




//// [mod1.d.ts]
export type Dotted = number;
/** @typedef {number} Dotted.Name */
export declare var dummy: number;
//// [file.d.ts]
export {};
