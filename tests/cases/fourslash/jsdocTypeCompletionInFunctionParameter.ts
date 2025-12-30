/// <reference path="fourslash.ts" />

// Tests for https://github.com/microsoft/TypeScript/issues/62281
// JSDoc @type completion in function parameter contexts

// @allowJs: true
// @checkJs: true

// @filename: /types.ts
////export interface MyType {
////    name: string;
////    value: number;
////}
////export interface OtherType {
////    id: number;
////}

// @filename: /main.js
/////** @import * as t from "./types" */
////
/////**
//// * @typedef {Object} MyNamespace
//// * @property {string} name
//// */
////
/////**
//// * @typedef {Object} MyNamespace.NestedType
//// * @property {number} value
//// */
////
/////** @typedef {number} SomeNumber */
////
//// // --- @import namespace completions ---
////
/////** @param {t./*importInParam*/} p */
////function f1(p) {}
////
////function f2(/** @type {t./*importInline*/} */ p) {}
////
/////** @type {t./*importOutside*/} */
////const x = {};
////
//// // --- @typedef completions ---
////
/////** @param {MyNamespace./*typedefInParam*/} p */
////function f3(p) {}
////
////function f4(/** @type {MyNamespace./*typedefInline*/} */ p) {}
////
////function f5(/** @type {Some/*typedefPartial*/} */ p) {}

verify.completions(
    {
        marker: ["importInParam", "importInline", "importOutside"],
        exact: [
            { name: "MyType", kind: "interface", kindModifiers: "export" },
            { name: "OtherType", kind: "interface", kindModifiers: "export" },
        ],
    },
    {
        marker: ["typedefInParam", "typedefInline"],
        includes: [{ name: "NestedType", kind: "type" }],
    },
    {
        marker: "typedefPartial",
        includes: [{ name: "SomeNumber", kind: "type" }],
    },
);

// NOTE: The case WITHOUT a parameter name (e.g., `function foo(/** @type {t.} */)`)
// is a parser limitation - the function is parsed with 0 parameters and the JSDoc
// is orphaned. This would require parser-level changes to fix.
