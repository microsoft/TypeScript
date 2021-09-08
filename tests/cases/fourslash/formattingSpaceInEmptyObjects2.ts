/// <reference path="fourslash.ts"/>

////const a = { };
////const b = {};

format.setOption("insertSpaceInEmptyObjects", false);
format.document();
verify.currentFileContentIs(
`const a = {};
const b = {};`
);
