/// <reference path="fourslash.ts" />


//// /*1*/var x = 1;/*2*/
//// void 0;

format.setOption("semicolons", "remove");
format.selection("1", "2");
verify.currentFileContentIs(
`var x = 1
void 0;`
);
