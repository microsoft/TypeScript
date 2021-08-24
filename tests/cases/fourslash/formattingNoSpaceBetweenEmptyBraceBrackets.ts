/// <reference path="fourslash.ts"/>

////const a = { };
////const b = {};

format.setOption("insertSpaceAfterOpeningAndBeforeClosingEmptyBraces", false);
format.document();
verify.currentFileContentIs(
`const a = {};
const b = {};`
);
