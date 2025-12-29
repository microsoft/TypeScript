/// <reference path="fourslash.ts" />

// @allowJs: true
// @checkJs: true

// @filename: /main.js
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
/////**
//// * @param {MyNamespace./*1*/} param
//// */
////function withTypedefInParam(param) {}
////
////function withInlineTypedef(/** @type {MyNamespace./*2*/} */ param) {}

verify.completions(
    {
        marker: ["1", "2"],
        includes: [
            { name: "NestedType", kind: "type" },
        ],
    },
);
