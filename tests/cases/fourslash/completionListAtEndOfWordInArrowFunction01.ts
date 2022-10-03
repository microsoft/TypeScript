/// <reference path='fourslash.ts' />

////xyz => x/*1*/

verify.completions({ marker: "1", includes: "xyz" });
