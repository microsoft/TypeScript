/// <reference path='fourslash.ts' />

////var x = {
////    "foo ": "space in the name",
////    "bar": "valid identifier name",
////    "break": "valid identifier name (matches a keyword)",
////    "any": "valid identifier name (matches a typescript keyword)",
////    "#": "invalid identifier name",
////    "$": "valid identifier name",
////    "\u0062": "valid unicode identifer name (b)",
////    "\u0031\u0062": "invalid unicode identifer name (1b)"
////};
////
////x./*a*/;
////x["/*b*/"];

verify.completionsAt("a", ["bar", "break", "any", "$", "b"]);
verify.completionsAt("b", ["foo ", "bar", "break", "any", "#", "$", "b", "\u0031\u0062"]);
