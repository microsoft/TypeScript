/// <reference path='fourslash.ts' />

// @Filename: a.ts
////import./*1*/

// @Filename: b.ts
////import.meta./*2*/

verify.completions({ marker: "1", exact: "meta" });
verify.completions({ marker: "2", exact: undefined });
