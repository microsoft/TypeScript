/// <reference path="fourslash.ts" />

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
//// * @param {t./*1*/} param
//// */
////function withParamTag(param) {}
////
////function withInlineType(/** @type {t./*2*/} */ param) {}
////
/////** @type {t./*3*/} */
////const outsideFunction = {};

verify.completions(
    {
        marker: ["1", "2", "3"],
        exact: [
            { name: "MyType", kind: "interface", kindModifiers: "export" },
            { name: "OtherType", kind: "interface", kindModifiers: "export" },
        ],
    },
);
