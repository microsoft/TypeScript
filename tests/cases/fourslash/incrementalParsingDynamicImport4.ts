/// <reference path="fourslash.ts"/>

// @lib: es2015

// @Filename: ./foo.ts
//// export function bar() { return 1; }

// @Filename: ./0.ts
//// /*1*/
//// import { bar } from "./foo"

verify.numberOfErrorsInCurrentFile(0);
goTo.marker("1");
edit.insert("import");
verify.numberOfErrorsInCurrentFile(1);