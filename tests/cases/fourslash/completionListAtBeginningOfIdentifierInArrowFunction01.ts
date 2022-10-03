/// <reference path='fourslash.ts' />

////xyz => /*1*/x

verify.completions({ marker: "1", includes: "xyz" });
