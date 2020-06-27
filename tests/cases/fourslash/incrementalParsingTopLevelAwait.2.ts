/// <reference path="fourslash.ts"/>

// @target: esnext
// @module: esnext

// @Filename: ./foo.ts
//// export {};
//// /*1*/

verify.numberOfErrorsInCurrentFile(0);
goTo.marker("1");
edit.insert("await(1);");
verify.numberOfErrorsInCurrentFile(0);
edit.replaceLine(1, "");
verify.numberOfErrorsInCurrentFile(0);