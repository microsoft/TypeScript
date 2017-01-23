/// <reference path='fourslash.ts' />

////var aa = 1;

////function testFunction(/*parameterName1*/

////function testFunction(a/*parameterName2*/

////function testFunction(a, /*parameterName3*/

////function testFunction(a, b/*parameterName4*/

////class bar5{ constructor(public /*constructorParamter1*/

////class bar6{ constructor(public a/*constructorParamter2*/

////class bar7{ constructor(protected a/*constructorParamter3*/

////class bar8{ constructor(private a/*constructorParamter4*/

////class bar9{ constructor(.../*constructorParamter5*/

////class bar10{ constructor(...a/*constructorParamter6*/

goTo.eachMarker(() => verify.completionListIsEmpty());
