
/// <reference path="fourslash.ts" />

////let x = { a: 1, b: 2 };
////let y = ({ a, /**/ } = x, 1);

verify.completions({ marker: "", exact: ["b"] });
