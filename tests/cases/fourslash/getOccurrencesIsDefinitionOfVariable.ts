/// <reference path='fourslash.ts' />
////var [|{| "isDefinition": true |}x|] = 0;
////var assignmentRightHandSide = [|{| "isDefinition": false |}x|];
////var assignmentRightHandSide2 = 1 + [|{| "isDefinition": false |}x|];
////
////[|{| "isDefinition": false |}x|] = 1;
////[|{| "isDefinition": false |}x|] = [|{| "isDefinition": false |}x|] + [|{| "isDefinition": false |}x|];
////
////[|{| "isDefinition": false |}x|] == 1;
////[|{| "isDefinition": false |}x|] <= 1;
////
////var preIncrement = ++[|{| "isDefinition": false |}x|];
////var postIncrement = [|{| "isDefinition": false |}x|]++;
////var preDecrement = --[|{| "isDefinition": false |}x|];
////var postDecrement = [|{| "isDefinition": false |}x|]--;
////
////[|{| "isDefinition": false |}x|] += 1;
////[|{| "isDefinition": false |}x|] <<= 1;
var firstRange = test.ranges()[0];
goTo.position(firstRange.start, firstRange.fileName);
test.ranges().forEach(range => {
    verify.referencesAtPositionContains(range, undefined, range.marker.data.isDefinition);
});
