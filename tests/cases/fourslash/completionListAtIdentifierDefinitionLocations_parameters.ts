/// <reference path='fourslash.ts' />

////var aa = 1;

////function testFunction(/*parameterName1*/

////function testFunction(a/*parameterName2*/

////function testFunction(a, /*parameterName3*/

////function testFunction(a, b/*parameterName4*/

////class bar1{ constructor(/*constructorParamter1*/

////class bar2{ constructor(a/*constructorParamter2*/

////class bar3{ constructor(a, /*constructorParamter3*/

////class bar4{ constructor(a, b/*constructorParamter4*/

////class bar5{ constructor(public /*constructorParamter5*/

////class bar6{ constructor(public a/*constructorParamter6*/

////class bar7{ constructor(private a/*constructorParamter7*/

////class bar8{ constructor(.../*constructorParamter8*/

////class bar9{ constructor(...a/*constructorParamter9*/


test.markers().forEach((m) => {
    goTo.position(m.position, m.fileName);
    verify.completionListIsEmpty();
});
