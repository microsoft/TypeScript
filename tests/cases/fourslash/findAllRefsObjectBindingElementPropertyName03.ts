/// <reference path='fourslash.ts'/>

////interface I {
////    [|{| "isWriteAccess": true, "isDefinition": true |}property1|]: number;
////    property2: string;
////}
////
////var foo: I;
////var [{ [|property1|]: prop1 }, { [|{| "isWriteAccess": true, "isDefinition": true |}property1|], property2 } ] = [foo, foo];

const ranges = test.ranges();
const [r0, r1, r2] = ranges;
verify.referenceGroups([r0, r1], [{ definition: "(property) I.property1: number", ranges }]);
verify.referenceGroups(r2, [
    { definition: "(property) I.property1: number", ranges: [r0, r1] },
    { definition: "var property1: number", ranges: [r2] }
]);
