/// <reference path="fourslash.ts" />
// @allowJs: true
// @Filename: something.js
////var C = function () { }
/////**
//// * The prototype method.
//// * @param {string} a Parameter definition.
//// */
////function f(a) {}
////C.prototype.m = f;
////
////var x = new C();
////x/*1*/./*2*/m();

verify.quickInfoAt("1", "var x: C");
verify.completions({
    marker: "2",
    includes: {
        name: "m",
        text: "(property) C.m: (a: string) => void",
        documentation: "The prototype method.",
        tags: [{ name: "param", text: "a Parameter definition." }],
    },
});
