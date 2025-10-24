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
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @param {Options} options
 */
export = function loader(options) { };
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
export type Options = {
    opt: string;
};
declare const _default: (options: any) => void;
export = _default;
