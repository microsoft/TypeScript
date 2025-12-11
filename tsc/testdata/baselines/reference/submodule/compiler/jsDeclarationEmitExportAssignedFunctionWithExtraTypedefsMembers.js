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
export type Options = {
    opt: string;
};
/**
 * @param {Options} options
 */
declare const _default: (options: Options) => void;
export = _default;


//// [DtsFileErrors]


out/index.d.ts(12,1): error TS2309: An export assignment cannot be used in a module with other exported elements.


==== out/index.d.ts (1 errors) ====
    /**
     * @typedef Options
     * @property {string} opt
     */
    export type Options = {
        opt: string;
    };
    /**
     * @param {Options} options
     */
    declare const _default: (options: Options) => void;
    export = _default;
    ~~~~~~~~~~~~~~~~~~
!!! error TS2309: An export assignment cannot be used in a module with other exported elements.
    