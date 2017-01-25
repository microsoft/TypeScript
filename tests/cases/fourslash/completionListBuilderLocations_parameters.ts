/// <reference path='fourslash.ts' />

////var aa = 1;

////class bar1{ constructor(/*constructorParamter1*/

////class bar2{ constructor(a/*constructorParamter2*/

////class bar3{ constructor(a, /*constructorParamter3*/

////class bar4{ constructor(a, b/*constructorParamter4*/

////class bar6{ constructor(public a, /*constructorParamter5*/

////class bar7{ constructor(private a, /*constructorParamter6*/

goTo.eachMarker(() => {
    verify.not.completionListIsEmpty();
    verify.completionListAllowsNewIdentifier();
});