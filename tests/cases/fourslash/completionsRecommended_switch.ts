/// <reference path="fourslash.ts" />

////enum Enu {}
////declare const e: Enu;
////switch (e) {
////    case E/*0*/:
////    case /*1*/:
////}

verify.completions({
    marker: test.markers(),
    includes: { name: "Enu", text: "enum Enu", kind: "enum", isRecommended: true },
});
