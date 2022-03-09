
/// <reference path="fourslash.ts" />

////let x = { a: 1, b: 2 };
////let y = ({ /**/ } = x, 1);

verify.completions({ marker: "", exact: ["a", "b"] });
