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
////     * @extends {C<number>} nothing really
////     * @class
////     * @this {*} doesn't make sense here
////     * @enum wat
////     */
////    /**
////     * @typedef {number} Meter
////     * @typedef {Object} Position
////     * @property {number} x what a horrible place for a type
////     * @property {number} y please don't do this
////     */
////    /**
////     * @template {string} T
////     * @callback Action not sure what this will do
////     * @param {T} thing
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
     * @extends {C<number>} nothing really
     * @class
     * @this {*} doesn't make sense here
     * @enum {wat}
     * @typedef {number} Meter
     * @typedef {Object} Position
     * @property {number} x what a horrible place for a type
     * @property {number} y please don't do this
     * @template {string} T
     * @callback Action not sure what this will do
     * @param {T} thing
     */
    get m() { return undefined }
}
o.m = 1`,
});

