/// <reference path='fourslash.ts' />

// @allowJs: true
// @checkJs: true
// @noImplicitAny: true
// @strictNullChecks: true
// @Filename: important.js

////function f(whatAGreatIdea, optionalThing) {
////    whatAGreatIdea += 0;
////    optionalThing += "";
////}
////f(1);
////f(1, 'hi');
////
////function g(InitialCaps) {
////    return InitialCaps * 2;
////}

verify.codeFixAll({
    fixId: "inferFromUsage",
    fixAllDescription: "Infer all types from usage",
    newFileContent:
`/**
 * @param {number} whatAGreatIdea what a great idea
 * @param {string} [optionalThing] optional thing
 */
function f(whatAGreatIdea, optionalThing) {
    whatAGreatIdea += 0;
    optionalThing += "";
}
f(1);
f(1, 'hi');

/**
 * @param {number} InitialCaps initial caps
 */
function g(InitialCaps) {
    return InitialCaps * 2;
}`,
});
