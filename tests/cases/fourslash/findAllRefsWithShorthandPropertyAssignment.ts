/// <reference path='fourslash.ts'/>

//// var [|{| "isWriteAccess": true, "isDefinition": true |}name|] = "Foo";
////
//// var obj = { [|{| "isWriteAccess": true, "isDefinition": true |}name|] };
//// var obj1 = { [|{| "isWriteAccess": true, "isDefinition": true |}name|]:[|name|] };
//// obj.[|name|];

const [r0, r1, r2, r3, r4] = test.ranges();
verify.referenceGroups([r0, r3], [{ definition: "var name: string", ranges: [r0, r1, r3] }]);
verify.referenceGroups(r1, [
    { definition: "var name: string", ranges: [r0, r1, r3] },
    { definition: "(property) name: string", ranges: [r4] }
]);
verify.singleReferenceGroup("(property) name: string", [r2]);
verify.referenceGroups(r4, [{ definition: "(property) name: string", ranges: [r1, r4] }]);
