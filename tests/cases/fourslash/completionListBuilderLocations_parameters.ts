/// <reference path='fourslash.ts' />

////var aa = 1;

////class bar1{ constructor(/*1*/

////class bar2{ constructor(a/*2*/

////class bar3{ constructor(a, /*3*/

////class bar4{ constructor(a, b/*4*/

////class bar6{ constructor(public a, /*5*/

////class bar7{ constructor(private a, /*6*/

verify.completions({
    marker: test.markers(),
    exact: completion.constructorParameterKeywords,
    isNewIdentifierLocation: true
});
