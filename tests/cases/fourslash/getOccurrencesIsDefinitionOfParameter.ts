/// <reference path='fourslash.ts' />
////function f([|{| "isDefinition": true |}x|]: number) {
////  return [|{| "isDefinition": false |}x|] + 1
////}
var firstRange = test.ranges()[0];
goTo.position(firstRange.start, firstRange.fileName);
test.ranges().forEach(range => {
    verify.referencesAtPositionContains(range, undefined, range.marker.data.isDefinition);
});
