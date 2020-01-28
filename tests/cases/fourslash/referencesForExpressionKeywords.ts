/// <reference path='fourslash.ts'/>

////[|class [|{| "isWriteAccess": true, "isDefinition": true, "contextRangeDelta": -1 |}C|] {
////    [|static [|{| "isWriteAccess": true, "isDefinition": true, "contextRangeDelta": -1 |}x|] = 1;|]
////}|]
/////*newKeyword*/new [|C|]();
/////*voidKeyword*/void [|C|];
/////*typeofKeyword*/typeof [|C|];
/////*deleteKeyword*/delete [|C|].[|x|];
////async function* f() {
////    /*yieldKeyword*/yield [|C|];
////    /*awaitKeyword*/await [|C|];
////}

const [, classDef,, xDef, newC, voidC, typeofC, deleteC, deleteCx, yieldC, awaitC] = test.ranges();
for (const keyword of ["newKeyword", "voidKeyword", "typeofKeyword", "yieldKeyword", "awaitKeyword"]) {
    verify.referenceGroups(keyword, [{ definition: "class C", ranges: [classDef, newC, voidC, typeofC, deleteC, yieldC, awaitC] }]);
}
verify.referenceGroups("deleteKeyword", [{ definition: "(property) C.x: number", ranges: [xDef, deleteCx] }]);