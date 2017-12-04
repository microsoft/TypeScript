/// <reference path="fourslash.ts" />

////enum E {}
////declare const e: E;
////switch (e) {
////    case /**/
////}

goTo.marker();
verify.completionListContains("E", "enum E", "", "enum", undefined, undefined, { isRecommended: true });
