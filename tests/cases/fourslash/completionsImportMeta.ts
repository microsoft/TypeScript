/// <reference path='fourslash.ts' />

// @Filename: a.ts
////import./*1*/

// @Filename: b.ts
////declare global {
////  interface ImportMeta {
////    url: string;
////  }
////}
////import.meta./*2*/

verify.completions(
  {
    marker: "1",
    exact: "meta"
  },
  {
    marker: "2",
    includes: ["url"],
    excludes: ["meta"]
  }
);
