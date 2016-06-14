/// <reference path='fourslash.ts' />
////enum [|{| "isDefinition": true |}E|] {
////    First,
////    Second
////}
////let first = [|{| "isDefinition": false |}E|].First;
var firstRange = test.ranges()[0];
goTo.position(firstRange.start, firstRange.fileName);
test.ranges().forEach(range => {
    verify.referencesAtPositionContains(range, undefined, range.marker.data.isDefinition);
});
