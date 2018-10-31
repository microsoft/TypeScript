/// <reference path='fourslash.ts' />

// @allowJs: true
// @checkJs: true
// @noImplicitAny: true
// @Filename: important.js
/////** @param {number} a */
////function f(a: number, [|...rest|]){
////    a; rest;
////}
////f(1);
////f(2, "s1");
////f(3, "s1", "s2");
////f(3, "s1", "s2", "s3", "s4");

verify.codeFix({
    description: "Infer parameter types from usage",
    index: 4,
    newFileContent:
`/**
 * @param {number} a
 * @param {string[]} rest
 */
function f(a: number, ...rest){
    a; rest;
}
f(1);
f(2, "s1");
f(3, "s1", "s2");
f(3, "s1", "s2", "s3", "s4");`,
});
