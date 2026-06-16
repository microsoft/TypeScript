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
////
/////**
//// * @param {Object} opts
//// * @param {string} opts.foo a foo
//// */
////function quotedName({ "foo": x }) {}
////quotedName(/*3*/);
////
/////**
//// * @param {Object} opts
//// * @param {number} opts.a aaa
//// * @param {number} opts.rest REST_DOC
//// */
////function withRest({ a, ...rest }) {}
////withRest(/*4*/);

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
    {
        // Quoted (string-literal) property name resolves its nested @param doc.
        marker: "3",
        parameterName: "__0",
        parameterDocComment: "foo: a foo",
        tags: [
            { name: "param", text: [{ text: "opts", kind: "text" }] },
            { name: "param", text: [{ text: "opts.foo", kind: "parameterName" }, { text: " ", kind: "space" }, { text: "a foo", kind: "text" }] },
        ],
    },
    {
        // Object-rest binding must not borrow the doc of a same-named property.
        marker: "4",
        parameterName: "__0",
        parameterDocComment: "a: aaa",
        tags: [
            { name: "param", text: [{ text: "opts", kind: "text" }] },
            { name: "param", text: [{ text: "opts.a", kind: "parameterName" }, { text: " ", kind: "space" }, { text: "aaa", kind: "text" }] },
            { name: "param", text: [{ text: "opts.rest", kind: "parameterName" }, { text: " ", kind: "space" }, { text: "REST_DOC", kind: "text" }] },
        ],
    },
);
