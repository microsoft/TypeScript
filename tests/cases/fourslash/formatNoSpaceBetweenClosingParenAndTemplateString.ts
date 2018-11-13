/// <reference path="fourslash.ts"/>

//// foo() `abc`;
//// bar()`def`;
//// baz()`a${x}b`;

format.document();
verify.currentFileContentIs(
`foo()\`abc\`;
bar()\`def\`;
baz()\`a\${x}b\`;`
);
