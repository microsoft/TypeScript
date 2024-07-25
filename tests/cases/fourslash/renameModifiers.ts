/// <reference path='fourslash.ts'/>

////[|[|declare|] [|abstract|] class [|{| "isWriteAccess": true, "isDefinition": true, "contextRangeDelta": -3 |}C1|] {
////    [|[|static|] [|{| "isWriteAccess": true, "isDefinition": true, "contextRangeDelta": -2 |}a|];|]
////    [|[|readonly|] [|{| "isWriteAccess": true, "isDefinition": true, "contextRangeDelta": -2 |}b|];|]
////    [|[|public|] [|{| "isWriteAccess": true, "isDefinition": true, "contextRangeDelta": -2 |}c|];|]
////    [|[|protected|] [|{| "isWriteAccess": true, "isDefinition": true, "contextRangeDelta": -2 |}d|];|]
////    [|[|private|] [|{| "isWriteAccess": true, "isDefinition": true, "contextRangeDelta": -2 |}e|];|]
////}|]
////[|[|const|] enum [|{| "isWriteAccess": true, "isDefinition": true, "contextRangeDelta": -2 |}E|] {
////}|]
////[|[|async|] function [|{| "isWriteAccess": true, "isDefinition": true, "contextRangeDelta": -2 |}fn|]() {}|]
////[|[|export|] [|default|] class [|{| "isWriteAccess": true, "isDefinition": true, "contextRangeDelta": -3 |}C2|] {}|]

const [
    class1Def, declareKeyword, abstractKeyword, class1Name,
    aDef, staticKeyword, aName,
    bDef, readonlyKeyword, bName,
    cDef, publicKeyword, cName,
    dDef, protectedKeyword, dName,
    eDef, privateKeyword, eName,
    enumDef, constKeyword, enumName,
    functionDef, asyncKeyword, functionName,
    class2Def, exportKeyword, defaultKeyword, class2Name,
] = test.ranges();
verify.baselineRename([
    declareKeyword, abstractKeyword,
    staticKeyword,
    readonlyKeyword,
    publicKeyword,
    protectedKeyword,
    privateKeyword,
    constKeyword,
    asyncKeyword,
    exportKeyword, defaultKeyword,
]);
