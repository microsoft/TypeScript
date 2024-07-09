/// <reference path="fourslash.ts"/>

//// if () {
//// }

format.setOption("PlaceOpenBraceOnNewLineForControlBlocks", true);
format.document();
verify.currentFileContentIs(
`if ()
{
}`);
