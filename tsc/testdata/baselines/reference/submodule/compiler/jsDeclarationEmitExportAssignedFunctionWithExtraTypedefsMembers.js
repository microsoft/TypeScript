//// [tests/cases/compiler/jsDeclarationEmitExportAssignedFunctionWithExtraTypedefsMembers.ts] ////

//// [index.js]
/**
 * @typedef Options
 * @property {string} opt
 */

/**
 * @param {Options} options
 */
module.exports = function loader(options) {}


//// [index.js]
"use strict";
/**
 * @typedef Options
 * @property {string} opt
 */
/**
 * @param {Options} options
 */
module.exports = function loader(options) { };


//// [index.d.ts]
/**
 * @typedef Options
 * @property {string} opt
 */
export = loader;
/**
 * @param {Options} options
 */
declare function loader(options: Options): void;
export type Options = {
    opt: string;
};
