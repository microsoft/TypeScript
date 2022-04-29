/// <reference path="fourslash.ts"/>

//// if(true) {/*0*/}
//// if(false)/*1*/{
//// }

format.setOption("PlaceOpenBraceOnNewLineForControlBlocks", true);
goTo.marker("0");
edit.insertLine("");
verify.currentFileContentIs(
`if (true)
{
}
if(false){
}`);
goTo.marker("1");
edit.insertLine("");
verify.currentFileContentIs(
`if (true)
{
}
if (false)
{
}`);