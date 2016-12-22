/// <reference path="fourslash.ts"/>

////const foo = [
////		1
////];

const options = format.copyFormatOptions();
options.IndentSize = 2;
options.TabSize = 2;
options.ConvertTabsToSpaces = false;
format.setFormatOptions(options);
format.document();
verify.currentFileContentIs(
`const foo = [
	1
];`);