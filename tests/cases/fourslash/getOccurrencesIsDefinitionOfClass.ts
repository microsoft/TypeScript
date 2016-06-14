/// <reference path='fourslash.ts' />
////class [|{| "isDefinition": true |}C|] {
////    n: number;
////    constructor() {
////        this.n = 12;
////    }
////}
////let c = new [|{| "isDefinition": false |}C|]();
var firstRange = test.ranges()[0];
goTo.position(firstRange.start, firstRange.fileName);
test.ranges().forEach(range => {
    verify.referencesAtPositionContains(range, undefined, range.marker.data.isDefinition);
});
