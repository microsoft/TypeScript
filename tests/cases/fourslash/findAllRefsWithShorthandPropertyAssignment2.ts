/// <reference path='fourslash.ts'/>

//// var [|{| "isWriteAccess": true, "isDefinition": true |}dx|] = "Foo";
////
//// module M { export var [|{| "isDefinition": true |}dx|]; }
//// module M {
////    var z = 100;
////    export var y = { [|{| "isWriteAccess": true, "isDefinition": true |}dx|], z };
//// }
//// M.y.[|dx|];

const [r0, r1, r2, r3] = test.ranges();
verify.singleReferenceGroup("var dx: string", [r0]);
verify.referenceGroups(r1, [{ definition: "var M.dx: any", ranges: [r1, r2] }]);
verify.referenceGroups(r2, [
    { definition: "var M.dx: any", ranges: [r1, r2] },
    { definition: "(property) dx: any", ranges: [r3] }
]);
verify.referenceGroups(r3, [{ definition: "(property) dx: any", ranges: [r2, r3] }]);
