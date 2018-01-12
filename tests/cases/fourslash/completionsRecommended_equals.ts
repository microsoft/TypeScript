/// <reference path="fourslash.ts" />

////enum Enu {}
////declare const e: Enu;
////e === /*a*/;
////e === E/*b*/

goTo.eachMarker(["a", "b"], () => {
    verify.completionListContains("Enu", "enum Enu", "", "enum", undefined, undefined, { isRecommended: true });
});
