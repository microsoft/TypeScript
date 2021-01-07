/// <reference path='fourslash.ts'/>

// @Filename: /jsDocAliasQuickInfo.ts
/////**
//// * Comment
//// * @type {number}
//// */
////export /*1*/default 10;

// @Filename: /test.ts
////export { /*2*/default as /*3*/test } from "./jsDocAliasQuickInfo";

verify.baselineQuickInfo();
