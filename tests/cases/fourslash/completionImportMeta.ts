/// <reference path='fourslash.ts' />

// @Filename: a.ts
////import./*1*/

// @Filename: b.ts
////import.meta./*2*/

// @Filename: c.ts
////import./*3*/meta

verify.completions(
  {
    marker: "1",
    exact: "meta"
  },
  {
    marker: "2",
    exact: undefined
  },
  {
    marker: "3",
    exact: "meta"
  }
);
