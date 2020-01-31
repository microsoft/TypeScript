/// <reference path='fourslash.ts'/>

////[|class [|{| "isWriteAccess": true, "isDefinition": true, "contextRangeDelta": -1 |}C|] {
////    [|static [|{| "isWriteAccess": true, "isDefinition": true, "contextRangeDelta": -1 |}x|] = 1;|]
////}|]
////[|new|] [|C|]();
////[|void|] [|C|];
////[|typeof|] [|C|];
////[|delete|] [|C|].[|x|];
////async function* f() {
////    [|yield|] [|C|];
////    [|await|] [|C|];
////}
////"x" [|in|] [|C|];
////undefined [|instanceof|] [|C|];
////undefined [|as|] [|C|];

const [
    classDecl,
    classDecl_name,
    fieldDecl,
    fieldDecl_name,
    newKeyword,
    newC,
    voidKeyword,
    voidC,
    typeofKeyword,
    typeofC,
    deleteKeyword,
    deleteC,
    deleteCx,
    yieldKeyword,
    yieldC,
    awaitKeyword,
    awaitC,
    inKeyword,
    inC,
    instanceofKeyword,
    instanceofC,
    asKeyword,
    asC,
] = test.ranges();
verify.referenceGroups([newKeyword, voidKeyword, typeofKeyword, yieldKeyword, awaitKeyword, inKeyword, instanceofKeyword, asKeyword], [{ definition: "class C", ranges: [classDecl_name, newC, voidC, typeofC, deleteC, yieldC, awaitC, inC, instanceofC, asC] }]);
verify.referenceGroups(deleteKeyword, [{ definition: "(property) C.x: number", ranges: [fieldDecl_name, deleteCx] }]);