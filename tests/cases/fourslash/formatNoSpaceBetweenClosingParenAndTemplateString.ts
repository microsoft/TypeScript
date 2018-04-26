/// <reference path="fourslash.ts"/>

//// foo() `abc`;
//// bar()`def`;

format.document();
verify.currentFileContentIs(
`foo()\`abc\`;
bar()\`def\`;`
);
