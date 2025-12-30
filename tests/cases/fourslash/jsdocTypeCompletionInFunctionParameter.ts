/// <reference path="fourslash.ts" />

// Tests based on issue #62281
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
//// // ============================================================
//// // Case 1: Regular @type on variable
//// // ============================================================
////
/////** @type {t./*case1*/} */
////const x = {};
////
//// // ============================================================
//// // Case 2: Inline @type with named parameter
//// // ============================================================
////
////function f2(/** @type {t./*case2*/} */ p) {}
////
//// // ============================================================
//// // Case 3: Property name in type literal (correctly NO completions)
//// // ============================================================
////
/////** @type { {/*case3*/ageX: number} } */
////var y;
////
//// // ============================================================
//// // Case 4: @import with named argument
//// // ============================================================
////
////function f4(/** @type {t./*case4*/} */arg) {}
////
//// // ============================================================
//// // Case 5: @import with unnamed argument (PARSER LIMITATION)
//// // The function is parsed with 0 parameters, JSDoc is orphaned.
//// // ============================================================
////
////function f5(/** @type {t./*case5*/} */) {}
////
//// // ============================================================
//// // Case 6: @typedef with unnamed argument (PARSER LIMITATION)
//// // The function is parsed with 0 parameters, JSDoc is orphaned.
//// // ============================================================
////
////function f6(/** @type {S/*case6*/} */) {}
////
//// // ============================================================
//// // Case 7: @typedef with named argument
//// // ============================================================
////
////function f7(/** @type {S/*case7*/} */arg) {}
////
//// // ============================================================
//// // Case 8: @param tag in function JSDoc
//// // ============================================================
////
/////**
//// * @param {t./*case8*/} p
//// */
////function f8(p) {}
////
//// // ============================================================
//// // Additional: @typedef namespace completions
//// // ============================================================
////
/////** @param {MyNamespace./*typedefInParam*/} p */
////function f9(p) {}
////
////function f10(/** @type {MyNamespace./*typedefInline*/} */ p) {}

// Cases that SHOULD have completions
verify.completions(
  // Case 1: Regular @type on variable
  {
    marker: "case1",
    exact: [
      { name: "MyType", kind: "interface", kindModifiers: "export" },
      { name: "OtherType", kind: "interface", kindModifiers: "export" },
    ],
  },
  // Case 2: Inline @type with named parameter
  {
    marker: "case2",
    exact: [
      { name: "MyType", kind: "interface", kindModifiers: "export" },
      { name: "OtherType", kind: "interface", kindModifiers: "export" },
    ],
  },
  // Case 4: @import with named argument
  {
    marker: "case4",
    exact: [
      { name: "MyType", kind: "interface", kindModifiers: "export" },
      { name: "OtherType", kind: "interface", kindModifiers: "export" },
    ],
  },
  // Case 7: @typedef with named argument
  {
    marker: "case7",
    includes: [{ name: "SomeNumber", kind: "type" }],
  },
  // Case 8: @param tag in function JSDoc
  {
    marker: "case8",
    exact: [
      { name: "MyType", kind: "interface", kindModifiers: "export" },
      { name: "OtherType", kind: "interface", kindModifiers: "export" },
    ],
  },
  // Additional: @typedef namespace completions
  {
    marker: ["typedefInParam", "typedefInline"],
    includes: [{ name: "NestedType", kind: "type" }],
  }
);

// Case 3: Property name in type literal - NO completions
// (defining a property name, not referencing a type)
verify.completions({
  marker: "case3",
  exact: undefined,
});

// Cases 5 & 6: Previously parser limitations, now FIXED with orphaned JSDoc handling.
verify.completions(
  {
    marker: "case5",
    exact: [
      { name: "MyType", kind: "interface", kindModifiers: "export" },
      { name: "OtherType", kind: "interface", kindModifiers: "export" },
    ],
  },
  {
    marker: "case6",
    includes: [{ name: "SomeNumber", kind: "type" }],
  }
);
