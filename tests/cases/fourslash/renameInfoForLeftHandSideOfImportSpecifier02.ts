/// <reference path='fourslash.ts'/>

// @Filename: fileA.ts
////export function __foo() {
////}

// @Filename: fileB.ts
////import { /**/[|__foo|] as bar } from "./fileA";
////
////bar();

goTo.marker();
verify.renameInfoSucceeded("__foo", '"tests/cases/fourslash/fileA".__foo');