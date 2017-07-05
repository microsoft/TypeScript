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

verify.rangesReferenceEachOther();
