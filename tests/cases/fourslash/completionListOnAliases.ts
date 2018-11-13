/// <reference path='fourslash.ts' />

////module M {
////    export var value;
////
////    import x = M;
////    /*1*/
////    x./*2*/
////}

verify.completions(
    { marker: "1", includes: [{ name: "x", text: "(alias) namespace x\nimport x = M" }] },
    { marker: "2", exact: "value" },
);
