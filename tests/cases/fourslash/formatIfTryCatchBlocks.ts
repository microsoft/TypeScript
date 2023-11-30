/// <reference path="fourslash.ts"/>

////try {
////}
////catch {
////}
////
////try {
////}
////catch (e) {
////}

format.setOption("PlaceOpenBraceOnNewLineForControlBlocks", true);
format.document();
verify.currentFileContentIs(
`try
{
}
catch
{
}

try
{
}
catch (e)
{
}`);
