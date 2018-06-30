/// <reference path="fourslash.ts" />

// @noLib: true
////
/////**
//// * Pad `str` to `width`.
//// *
//// * @param {String} str
//// * @param {Number} wid/*1*/
goTo.marker('1');
edit.insert("th\n@");
const c = classification;
verify.syntacticClassificationsAre(
    c.comment("/**\n * Pad `str` to `width`.\n *\n * "),
    c.punctuation("@"),
    c.docCommentTagName("param"),
    c.comment(" "),
    c.punctuation("{"),
    c.identifier("String"),
    c.punctuation("}"),
    c.comment(" "),
    c.parameterName("str"),
    c.comment("\n * "),
    c.punctuation("@"),
    c.docCommentTagName("param"),
    c.comment(" "),
    c.punctuation("{"),
    c.identifier("Number"),
    c.punctuation("}"),
    c.comment(" "),
    c.parameterName("wid"),
    c.comment(""), // syntatic classification verification always just uses input text, so the edits don't appear
);
