/// <reference path='fourslash.ts'/>

//// var [|{| "isWriteAccess": true, "isDefinition": true |}dx|] = "Foo";
////
//// module M { export var [|{| "isWriteAccess": true, "isDefinition": true |}dx|]; }
//// module M {
////    var z = 100;
////    export var y = { [|{| "isWriteAccess": true, "isDefinition": true |}dx|], z };
//// }
//// M.y.[|dx|];

const [r0, r1, r2, r3] = test.ranges();
const valueRanges = [r1, r2];
verify.singleReferenceGroup("var dx: string", [r0]);
verify.referenceGroups(valueRanges, [
    { definition: "var M.dx: any", ranges: valueRanges },
    { definition: "(property) dx: any", ranges: [r2, r3] }
]);
verify.referenceGroups(r3, [
    { definition: "(property) dx: any", ranges: [r2] },
    { definition: "(property) dx: any", ranges: [r3] }
]);
