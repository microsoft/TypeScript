///<reference path="fourslash.ts" />
// @allowJs: true
// @Filename: Foo.js
/////**
//// * @param {string} p1 - A string param
//// * @param {string?} p2 - An optional param
//// * @param {string} [p3] - Another optional param
//// * @param {string} [p4="test"] - An optional param with a default value
//// */
////function f1(p1, p2, p3, p4){}
////f1(/*1*/'foo', /*2*/'bar', /*3*/'baz', /*4*/'qux');

const tags: ReadonlyArray<FourSlashInterface.JSDocTagInfo> = [
    { name: "param", text: "p1 - A string param" },
    { name: "param", text: "p2 - An optional param" },
    { name: "param", text: "p3 - Another optional param" },
    { name: "param", text: "p4 - An optional param with a default value" },
];
verify.signatureHelp(
    { marker: "1", parameterDocComment: "- A string param", tags },
    { marker: "2", parameterDocComment: "- An optional param", tags },
    { marker: "3", parameterDocComment: "- Another optional param", tags },
    { marker: "4", parameterDocComment: "- An optional param with a default value", tags },
);
