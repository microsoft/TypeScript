/// <reference path="fourslash.ts" />

////enum Enu {}
////declare const e: Enu;
////e === /*a*/;
////e === E/*b*/

verify.completions({
    marker: ["a", "b"],
    includes: { name: "Enu", text: "enum Enu", kind: "enum", isRecommended: true },
});
