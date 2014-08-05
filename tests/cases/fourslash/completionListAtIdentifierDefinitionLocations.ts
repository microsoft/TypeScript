/// <reference path='fourslash.ts' />

////var aa = 1;
////class /*className1*/
////class a/*className2*/
////interface /*interfaceName1*/
////interface a/*interfaceName2*/
////module /*moduleName1*/
////module a/*moduleName2*/
////enum /*enumName1*/
////enum a/*enumName2*/
////// fourslash is saying completion list is not empty on this line but editor disagrees
//////enum a { /*enumValueName1*/
////enum a { f/*enumValueName2*/
////enum a { foo, /*enumValueName3*/
////var x = 0; enum /*enumName4*/
////function /*functionName1*/
////function a/*functionName2*/
////var /*varName1*/
////var a/*varName2*/
////var a2,/*varName3*/
////var a2, a/*varName4*/
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
//// try {} catch(/*catchVariable1*/
//// try {} catch(a/*catchVariable2*/

test.markers().forEach((m) => {
    goTo.position(m.position, m.fileName);
    verify.completionListIsEmpty();
});
