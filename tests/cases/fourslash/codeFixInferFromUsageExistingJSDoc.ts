/// <reference path='fourslash.ts' />
// @allowJs: true
// @checkJs: true
// @noImplicitAny: true
// @strictNullChecks: false
// @Filename: important.js

/////** @param x no types here! */
/////**
//// * 1
//// * @param x a duplicate!
//// * @param y yy
//// */
/////**
//// * 2
//// * @param z zz
//// */
////function f(x) {
////    return x * 1
////}
////
////var o = {
////    /** 1
////     * @return First one
////     */
////    /** 2
////     * @see also
////     */
////    /** 3
////     * @return Second one
////     * @extends {*} nothing really
////     * @class
////     * @this doesn't make sense here
////     * @enum wat
////     * @template {string} T
////     * @typedef {number} Meter
////     * @callback Thunk not sure what this will do
////     */
////    get m() { return undefined }
////}
////o.m = 1

verify.codeFixAll({
    fixId: "inferFromUsage",
    fixAllDescription: "Infer all types from usage",
    newFileContent:
`/**
 * 1 2
 * @param {number} x no types here!
 * @param x a duplicate!
 * @param y yy
 * @param z zz
 */
function f(x) {
    return x * 1
}

var o = {
    /**
     * 1 2 3
     * @returns {number} First one
     * @see also
     * @returns Second one
     * @extends {*} nothing really
     * @class
     * @this doesn't make sense here
     * @enum wat
     * @template {string} T
     * @typedef {number} Meter
     * @callback Thunk not sure what this will do
     */
    get m() { return undefined }
}
o.m = 1`,
});

