/// <reference path='fourslash.ts'/>

////interface I {
////    [|[|{| "isDefinition": true, "contextRangeIndex": 0 |}property1|]: number;|]
////    property2: string;
////}
////
////var foo: I;
////[|var [{ [|{| "contextRangeIndex": 2 |}property1|]: prop1 }, { [|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 2 |}property1|], property2 } ] = [foo, foo];|]

const [r0Def, r0, r1Def, r1, r2] = test.ranges();
verify.referenceGroups([r0, r1], [{
    definition: "(property) I.property1: number",
    ranges: [r0, r1, r2]
}]);
verify.referenceGroups(r2, [
    { definition: "(property) I.property1: number", ranges: [r0, r1] },
    { definition: "var property1: number", ranges: [r2] }
]);
