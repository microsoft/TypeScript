//// [propertyAssignmentUseParentType1.ts]
interface N {
    (): boolean
    num: 123;
}
export const interfaced: N = () => true;
interfaced.num = 123;

export const inlined: { (): boolean; nun: 456 } = () => true;
inlined.nun = 456;

export const ignoreJsdoc = () => true;
/** @type {string} make sure to ignore jsdoc! */
ignoreJsdoc.extra = 111


//// [propertyAssignmentUseParentType1.js]
"use strict";
exports.__esModule = true;
exports.interfaced = function () { return true; };
exports.interfaced.num = 123;
exports.inlined = function () { return true; };
exports.inlined.nun = 456;
exports.ignoreJsdoc = function () { return true; };
/** @type {string} make sure to ignore jsdoc! */
exports.ignoreJsdoc.extra = 111;
