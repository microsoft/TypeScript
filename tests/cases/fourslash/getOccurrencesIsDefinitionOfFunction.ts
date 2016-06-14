/// <reference path='fourslash.ts' />
////function [|{| "isDefinition": true |}func|](x: number) {
////}
////[|{| "isDefinition": false |}func|](x)
var firstRange = test.ranges()[0];
goTo.position(firstRange.start, firstRange.fileName);
test.ranges().forEach(range => {
    verify.referencesAtPositionContains(range, undefined, range.marker.data.isDefinition);
});
