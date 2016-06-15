/// <reference path='fourslash.ts' />
////type [|{| "isDefinition": true |}Alias|]= number;
////let n: [|{| "isDefinition": false |}Alias|] = 12;
var firstRange = test.ranges()[0];
goTo.position(firstRange.start, firstRange.fileName);
test.ranges().forEach(range => {
    verify.referencesAtPositionContains(range, undefined, range.marker.data.isDefinition);
});
