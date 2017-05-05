/// <reference path='fourslash.ts'/>

////interface I {
////    [|{| "isWriteAccess": true, "isDefinition": true |}property1|]: number;
////    property2: string;
////}
////
////var foo: I;
////var [{ [|property1|]: prop1 }, { [|{| "isWriteAccess": true, "isDefinition": true |}property1|], property2 } ] = [foo, foo];

const ranges = test.ranges();
const [, , r2] = ranges;
verify.referenceGroups(ranges, [
    { definition: "(property) I.property1: number", ranges: ranges },
    { definition: "var property1: number", ranges: [r2] }
]);