/// <reference path="fourslash.ts"/>

// @target: esnext
// @module: esnext

// @Filename: ./foo.ts
//// await(1);
//// /*1*/

verify.numberOfErrorsInCurrentFile(1);
goTo.marker("1");
edit.insert("export {};");
verify.numberOfErrorsInCurrentFile(0);
edit.replaceLine(1, "");
verify.numberOfErrorsInCurrentFile(1);