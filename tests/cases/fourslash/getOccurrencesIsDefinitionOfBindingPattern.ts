/// <reference path='fourslash.ts' />
////const { [|{| "isDefinition": true |}x|], y } = { x: 1, y: 2 };
////const z = [|{| "isDefinition": false |}x|];
var firstRange = test.ranges()[0];
goTo.position(firstRange.start, firstRange.fileName);
test.ranges().forEach(range => {
    verify.referencesAtPositionContains(range, undefined, range.marker.data.isDefinition);
});
