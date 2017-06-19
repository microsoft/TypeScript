/// <reference path="fourslash.ts"/>

//// if (true) {
//// }
//// if () {
//// }

format.setOption("PlaceOpenBraceOnNewLineForControlBlocks", true);
format.document();
verify.currentFileContentIs(
`if (true)
{
}
if ()
{
}`);
