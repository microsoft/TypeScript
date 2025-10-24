//// [tests/cases/conformance/jsdoc/declarations/jsDeclarationsTypedefDescriptionsPreserved.ts] ////

//// [index.js]
/**
 * Options for Foo <------------
 * @typedef {Object} FooOptions
 * @property {boolean} bar - Marvin K Mooney
 * @property {string} baz - Sylvester McMonkey McBean
 */

/**
 * Multiline
 * Options
 * for Foo <------------
 * @typedef {Object} BarOptions
 * @property {boolean} bar - Marvin K Mooney
 * @property {string} baz - Sylvester McMonkey McBean
 */


//// [index.js]
"use strict";
/**
 * Options for Foo <------------
 * @typedef {Object} FooOptions
 * @property {boolean} bar - Marvin K Mooney
 * @property {string} baz - Sylvester McMonkey McBean
 */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Multiline
 * Options
 * for Foo <------------
 * @typedef {Object} BarOptions
 * @property {boolean} bar - Marvin K Mooney
 * @property {string} baz - Sylvester McMonkey McBean
 */


//// [index.d.ts]
/**
 * Options for Foo <------------
 * @typedef {Object} FooOptions
 * @property {boolean} bar - Marvin K Mooney
 * @property {string} baz - Sylvester McMonkey McBean
 */
export type FooOptions = {
    bar: boolean;
    baz: string;
};
export type BarOptions = {
    bar: boolean;
    baz: string;
};
/**
 * Multiline
 * Options
 * for Foo <------------
 * @typedef {Object} BarOptions
 * @property {boolean} bar - Marvin K Mooney
 * @property {string} baz - Sylvester McMonkey McBean
 */
