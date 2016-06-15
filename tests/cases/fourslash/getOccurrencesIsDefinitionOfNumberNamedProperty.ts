/// <reference path='fourslash.ts' />
////let o = { [|{| "isDefinition": true |}1|]: 12 };
////let y = o[[|{| "isDefinition": false |}1|]];
var firstRange = test.ranges()[0];
goTo.position(firstRange.start, firstRange.fileName);
test.ranges().forEach(range => {
    verify.referencesAtPositionContains(range, undefined, range.marker.data.isDefinition);
});
