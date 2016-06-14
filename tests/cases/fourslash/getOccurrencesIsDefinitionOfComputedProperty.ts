/// <reference path='fourslash.ts' />
////let o = { ["[|{| "isDefinition": true |}foo|]"]: 12 };
////let y = o.[|{| "isDefinition": false |}foo|];
////let z = o['[|{| "isDefinition": false |}foo|]'];
var firstRange = test.ranges()[0];
goTo.position(firstRange.start, firstRange.fileName);
test.ranges().forEach(range => {
    verify.referencesAtPositionContains(range, undefined, range.marker.data.isDefinition);
});
