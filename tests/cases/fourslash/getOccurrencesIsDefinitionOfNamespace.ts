/// <reference path='fourslash.ts' />
////namespace [|{| "isDefinition": true |}Numbers|] {
////    export var n = 12;
////}
////let x = [|{| "isDefinition": false |}Numbers|].n + 1;
var firstRange = test.ranges()[0];
goTo.position(firstRange.start, firstRange.fileName);
test.ranges().forEach(range => {
    verify.referencesAtPositionContains(range, undefined, range.marker.data.isDefinition);
});
