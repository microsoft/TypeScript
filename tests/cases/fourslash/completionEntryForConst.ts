///<reference path="fourslash.ts" />

////const c = "s";
/////**/

goTo.marker();
verify.completionListContains("c", "const c: \"s\"", /*documentation*/ undefined, "const");