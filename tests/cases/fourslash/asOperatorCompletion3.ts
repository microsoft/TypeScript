/// <reference path="fourslash.ts" />

//// type T = number;
//// var x;
//// var y = x as /**/ // comment

verify.completions({ marker: "", includes: "T" });

