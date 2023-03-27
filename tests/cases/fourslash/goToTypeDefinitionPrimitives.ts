/// <reference path='fourslash.ts' />

// @Filename: module1.ts
////var w: {a: number};
////var x = "string";
////var y: number | string;
////var z; // any

// @Filename: module2.ts
////w./*reference1*/a;
/////*reference2*/x;
/////*reference3*/y;
/////*reference4*/y;

verify.baselineGoToType(
    "reference1",
    "reference2",
    "reference3",
    "reference4",
);
