/// <reference path='fourslash.ts' />

////var aa = 1;

////function testFunction(/*parameterName1*/

////function testFunction(a/*parameterName2*/

////function testFunction(a, /*parameterName3*/

////function testFunction(a, b/*parameterName4*/

////class bar5{ constructor(public /*constructorParameter1*/

////class bar6{ constructor(public a/*constructorParameter2*/

////class bar7{ constructor(protected a/*constructorParameter3*/

////class bar8{ constructor(private a/*constructorParameter4*/

////class bar9{ constructor(.../*constructorParameter5*/

////class bar10{ constructor(...a/*constructorParameter6*/

verify.completions(
    {
        marker: [1,2,3,4].map(i => `parameterName${i}`),
        exact: undefined,
    },
    {
        marker: [1,2,3,4].map(i => `constructorParameter${i}`),
        exact: completion.constructorParameterKeywords,
        isNewIdentifierLocation: true,
    },
    {
        marker: [5, 6].map(i => `constructorParameter${i}`),
        exact: undefined,
        isNewIdentifierLocation: true,
    },
);
