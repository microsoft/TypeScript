/// <reference path="fourslash.ts"/>

////const a = { };
////const b = {};

format.setOption("insertSpaceAfterOpeningAndBeforeClosingEmptyBraces", true);
format.document();
verify.currentFileContentIs(
`const a = { };
const b = { };`
);
