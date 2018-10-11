/// <reference path='fourslash.ts'/>

// @Filename: fileA.ts
////export function foo() {
////}

// @Filename: fileB.ts
////import { /**/[|foo|] as bar } from "./fileA";
////
////bar();

goTo.marker();
verify.renameInfoSucceeded("foo", '"tests/cases/fourslash/fileA".foo');