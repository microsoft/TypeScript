/// <reference path='fourslash.ts' />

////var [|{| "isWriteAccess": true |}x|] = 0;
////var assignmentRightHandSide = [|{| "isWriteAccess": false |}x|];
////var assignmentRightHandSide2 = 1 + [|{| "isWriteAccess": false |}x|];
////
////[|{| "isWriteAccess": true |}x|] = 1;
////[|{| "isWriteAccess": true |}x|] = [|{| "isWriteAccess": false |}x|] + [|{| "isWriteAccess": false |}x|];
////
////[|{| "isWriteAccess": false |}x|] == 1;
////[|{| "isWriteAccess": false |}x|] <= 1;
////
////var preIncrement = ++[|{| "isWriteAccess": true |}x|];
////var postIncrement = [|{| "isWriteAccess": true |}x|]++;
////var preDecrement = --[|{| "isWriteAccess": true |}x|];
////var postDecrement = [|{| "isWriteAccess": true |}x|]--;
////
////[|{| "isWriteAccess": true |}x|] += 1;
////[|{| "isWriteAccess": true |}x|] <<= 1;

verify.baselineDocumentHighlights(test.ranges()[0]);