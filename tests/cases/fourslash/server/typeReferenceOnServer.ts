/// <reference path='../fourslash.ts' />

/////// <reference types="foo" />
////var x: number;
////x./*1*/

verify.completions({ marker: "1", includes: "toFixed" });

