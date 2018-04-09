/// <reference path="fourslash.ts" />

////enum Enu {}
////declare const e: Enu;
////switch (e) {
////    case E/*0*/:
////    case /*1*/:
////}

goTo.eachMarker((_, idx) => {
    verify.completionListContains("Enu", "enum Enu", "", "enum", undefined, undefined, { isRecommended: true });
});
