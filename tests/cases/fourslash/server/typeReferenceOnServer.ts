/// <reference path='../fourslash.ts' />

// @lib: es5

/////// <reference types="foo" />
////var x: number;
////x./*1*/

verify.completions({ marker: "1", includes: "toFixed" });

