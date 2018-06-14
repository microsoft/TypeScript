/// <reference path='fourslash.ts' />

//// 
//// var varName =/**/
//// 

goTo.marker();
edit.insert("\n{");
verify.currentFileContentIs(
`
var varName =
    {
`
);

edit.insert("\na: 1");
format.document();
verify.currentFileContentIs(
`
var varName =
{
    a: 1
`
);

edit.insert("\n};");

format.document();
verify.currentFileContentIs(
`
var varName =
{
    a: 1
};
`
);