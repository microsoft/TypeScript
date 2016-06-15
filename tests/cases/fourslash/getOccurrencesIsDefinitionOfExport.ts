/// <reference path='fourslash.ts' />
// @Filename: m.ts
////export var [|{| "isDefinition": true |}x|] = 12;
// @Filename: main.ts
////import { [|{| "isDefinition": true |}x|] } from "./m";
////const y = [|{| "isDefinition": false |}x|];
var firstRange = test.ranges()[0];
goTo.position(firstRange.start, firstRange.fileName);
test.ranges().forEach(range => {
    verify.referencesAtPositionContains(range, undefined, range.marker.data.isDefinition);
});
