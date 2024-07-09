/// <reference path='fourslash.ts' />

////xyz => x/*1*/y

verify.completions({ marker: "1", includes: "xyz" });
