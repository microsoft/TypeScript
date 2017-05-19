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
////x./**/

goTo.marker();

verify.completionListContains("bar");
verify.completionListContains("break");
verify.completionListContains("any");
verify.completionListContains("$");

// Nothing else should show up
verify.completionListCount(4);
