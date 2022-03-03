/// <reference path='fourslash.ts' />

// Module: esnext

// @Filename: a.ts
////import./*1*/

// @Filename: b.ts
////declare global {
////  interface ImportMeta {
////    url: string;
////  }
////}
////import.meta./*2*/

// @Filename: c.ts
////import.meta./*3*/url

// @Filename: d.ts
////import./*4*/meta

verify.completions(
  {
    marker: "1",
    exact: "meta"
  },
  {
    marker: "2",
    includes: ["url"],
    excludes: ["meta"]
  },
  {
    marker: "3",
    includes: ["url"],
    excludes: ["meta"]
  },
  {
    marker: "4",
    exact: "meta"
  }
);
