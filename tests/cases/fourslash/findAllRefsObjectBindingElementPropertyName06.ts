/// <reference path='fourslash.ts'/>

////interface I {
////    [|property1|]: number;
////    property2: string;
////}
////
////var elems: I[];
////for (let { [|property1|]: p } of elems) {
////}
////for (let { property1 } of elems) {
////}
////for (var { [|property1|]: p1 } of elems) {
////}
////var p2;
////for ({ property1 : p2 } of elems) {
////}

// Note: if this test ever changes, consider updating
//       'quickInfoForObjectBindingElementPropertyName05.ts'

let ranges = test.ranges();
for (let range of ranges) {
    goTo.position(range.start);

    verify.referencesCountIs(ranges.length);
    for (let expectedRange of ranges) {
        verify.referencesAtPositionContains(expectedRange);
    }
}