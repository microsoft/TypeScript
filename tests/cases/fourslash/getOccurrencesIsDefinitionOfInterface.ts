/// <reference path='fourslash.ts' />
////interface [|{| "isDefinition": true |}I|] {
////    p: number;
////}
////let i: [|{| "isDefinition": false |}I|] = { p: 12 };
var firstRange = test.ranges()[0];
goTo.position(firstRange.start, firstRange.fileName);
test.ranges().forEach(range => {
    verify.referencesAtPositionContains(range, undefined, range.marker.data.isDefinition);
});
