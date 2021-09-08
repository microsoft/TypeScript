/// <reference path="fourslash.ts"/>

////const a = { };
////const b = {};

format.document();
verify.currentFileContentIs(
`const a = {};
const b = {};`
);
