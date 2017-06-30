/// <reference path='fourslash.ts' />

////class C
////{}
////if (true)
////{}

format.document();
verify.currentFileContentIs(
`class C { }
if (true) { }`);