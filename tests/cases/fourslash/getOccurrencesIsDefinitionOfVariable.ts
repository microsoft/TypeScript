/// <reference path='fourslash.ts' />
////var [|{| "isWriteAccess": true, "isDefinition": true |}x|] = 0;
////var assignmentRightHandSide = [|x|];
////var assignmentRightHandSide2 = 1 + [|x|];
////
////[|{| "isWriteAccess": true |}x|] = 1;
////[|{| "isWriteAccess": true |}x|] = [|x|] + [|x|];
////
////[|x|] == 1;
////[|x|] <= 1;
////
////var preIncrement = ++[|{| "isWriteAccess": true |}x|];
////var postIncrement = [|{| "isWriteAccess": true |}x|]++;
////var preDecrement = --[|{| "isWriteAccess": true |}x|];
////var postDecrement = [|{| "isWriteAccess": true |}x|]--;
////
////[|{| "isWriteAccess": true |}x|] += 1;
////[|{| "isWriteAccess": true |}x|] <<= 1;

verify.singleReferenceGroup("var x: number");
