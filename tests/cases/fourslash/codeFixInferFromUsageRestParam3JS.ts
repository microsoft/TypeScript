/// <reference path='fourslash.ts' />

// @allowJs: true
// @checkJs: true
// @noImplicitAny: true
// @Filename: important.js
/////** @param {number} a */
////function f(a, [|...rest|]){
////    a;
////    rest.push(22);
////}

verify.codeFix({
    description: "Infer parameter types from usage",
    index: 2,
    newFileContent:
`/**
 * @param {number} a
 * @param {number[]} rest
 */
function f(a, ...rest){
    a;
    rest.push(22);
}`,
});
