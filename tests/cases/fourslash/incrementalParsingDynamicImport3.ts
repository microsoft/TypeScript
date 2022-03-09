/// <reference path="fourslash.ts"/>

// @lib: es2015

// @Filename: ./foo.ts
//// export function bar() { return 1; }

// @Filename: ./0.ts
//// var x = import/*1*/

verify.numberOfErrorsInCurrentFile(0);
goTo.marker("1");
edit.insert("(");
verify.numberOfErrorsInCurrentFile(1);