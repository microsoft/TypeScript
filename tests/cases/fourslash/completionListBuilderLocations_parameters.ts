/// <reference path='fourslash.ts' />

////var aa = 1;

////class bar1{ constructor(/*constructorParameter1*/

////class bar2{ constructor(a/*constructorParameter2*/

////class bar3{ constructor(a, /*constructorParameter3*/

////class bar4{ constructor(a, b/*constructorParameter4*/

////class bar6{ constructor(public a, /*constructorParameter5*/

////class bar7{ constructor(private a, /*constructorParameter6*/


test.markers().forEach((m) => {
    goTo.position(m.position, m.fileName);
    verify.not.completionListIsEmpty();
    verify.completionListAllowsNewIdentifier();
});