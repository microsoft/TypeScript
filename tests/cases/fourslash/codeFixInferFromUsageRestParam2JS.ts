/// <reference path='fourslash.ts' />

// @allowJs: true
// @checkJs: true
// @noImplicitAny: true
// @Filename: important.js
/////** @param {number} a */
////function f(a, [|...rest|]){
////    a; rest;
////}
////f(1);
////f(2, "s1");
////f(3, false, "s2");
////f(4, "s1", "s2", false, "s4");

verify.codeFix({
    description: "Infer parameter types from usage",
    index: 2,
    newFileContent:
`/**
 * @param {number} a
 * @param {(string | boolean)[]} rest
 */
function f(a, ...rest){
    a; rest;
}
f(1);
f(2, "s1");
f(3, false, "s2");
f(4, "s1", "s2", false, "s4");`,
});
