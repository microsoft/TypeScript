/// <reference path='fourslash.ts' />

// @allowJs: true
// @checkJs: true
// @Filename: a.js

/////**
//// * @param {Object} opts The options bag.
//// * @param {number} opts.id The numeric id.
//// * @param {string} opts.label The display label.
//// */
////function withParentDoc({ id, label }) {}
////withParentDoc(/*1*/);
////
/////**
//// * @param {Object} opts
//// * @param {number} opts.id The numeric id.
//// * @param {string} opts.label The display label.
//// */
////function withoutParentDoc({ id, label }) {}
////withoutParentDoc(/*2*/);

verify.signatureHelp(
    {
        marker: "1",
        parameterName: "__0",
        parameterDocComment: "The options bag.\nid: The numeric id.\nlabel: The display label.",
        tags: [
            { name: "param", text: [{ text: "opts", kind: "parameterName" }, { text: " ", kind: "space" }, { text: "The options bag.", kind: "text" }] },
            { name: "param", text: [{ text: "opts.id", kind: "parameterName" }, { text: " ", kind: "space" }, { text: "The numeric id.", kind: "text" }] },
            { name: "param", text: [{ text: "opts.label", kind: "parameterName" }, { text: " ", kind: "space" }, { text: "The display label.", kind: "text" }] },
        ],
    },
    {
        marker: "2",
        parameterName: "__0",
        parameterDocComment: "id: The numeric id.\nlabel: The display label.",
        tags: [
            { name: "param", text: [{ text: "opts", kind: "text" }] },
            { name: "param", text: [{ text: "opts.id", kind: "parameterName" }, { text: " ", kind: "space" }, { text: "The numeric id.", kind: "text" }] },
            { name: "param", text: [{ text: "opts.label", kind: "parameterName" }, { text: " ", kind: "space" }, { text: "The display label.", kind: "text" }] },
        ],
    },
);
