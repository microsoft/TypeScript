/// <reference path="fourslash.ts"/>

// @lib: es6

// @Filename: ./foo.ts
//// export function bar() { return 1; }

//// var x1 = import("./foo");
//// x1.then(foo => {
////    var s: string = foo.bar();
//// })
//// /*1*/

verify.numberOfErrorsInCurrentFile(1);
goTo.marker("1");
edit.insert("  ");
verify.numberOfErrorsInCurrentFile(1);