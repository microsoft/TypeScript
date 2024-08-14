/// <reference path='fourslash.ts' />

// @noLib: true

////function F(pref: (a/*1*/

verify.completions({
    marker: "1",
    exact: completion.typeKeywords,
    isNewIdentifierLocation: true,
    defaultCommitCharacters: [],
});
