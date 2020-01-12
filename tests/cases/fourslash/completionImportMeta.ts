/// <reference path='fourslash.ts' />

// @Filename: a.ts
////import./*1*/

// @Filename: b.ts
////import.meta./*2*/

// @Filename: c.ts
////declare global {
////  interface ImportMeta {
////    url: string;
////  }
////}
////import.meta.u/*3*/

verify.completions({ marker: "1", exact: "meta" });
verify.completions({ marker: "2", exact: undefined });
verify.completions({ marker: "3", exact: "url" });
