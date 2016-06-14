/// <reference path='fourslash.ts' />
////var [|{| "isDefinition": true |}f|] = x => x + 1;
////[|{| "isDefinition": false |}f|](12);
var firstRange = test.ranges()[0];
goTo.position(firstRange.start, firstRange.fileName);
test.ranges().forEach(range => {
    verify.referencesAtPositionContains(range, undefined, range.marker.data.isDefinition);
});
