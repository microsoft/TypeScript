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
Object.defineProperty(exports, "__esModule", { value: true });
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


//// [index.d.ts]
export type FooOptions = {
    bar: boolean;
    baz: string;
};
export type BarOptions = {
    bar: boolean;
    baz: string;
};
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
