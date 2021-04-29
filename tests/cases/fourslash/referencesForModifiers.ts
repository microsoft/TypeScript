/// <reference path='fourslash.ts'/>

////[|/*declareModifier*/declare /*abstractModifier*/abstract class [|{| "isWriteAccess": true, "isDefinition": true, "contextRangeDelta": -1 |}C1|] {
////    [|/*staticModifier*/static [|{| "isWriteAccess": true, "isDefinition": true, "contextRangeDelta": -1 |}a|];|]
////    [|/*readonlyModifier*/readonly [|{| "isWriteAccess": true, "isDefinition": true, "contextRangeDelta": -1 |}b|];|]
////    [|/*publicModifier*/public [|{| "isWriteAccess": true, "isDefinition": true, "contextRangeDelta": -1 |}c|];|]
////    [|/*protectedModifier*/protected [|{| "isWriteAccess": true, "isDefinition": true, "contextRangeDelta": -1 |}d|];|]
////    [|/*privateModifier*/private [|{| "isWriteAccess": true, "isDefinition": true, "contextRangeDelta": -1 |}e|];|]
////}|]
////[|/*constModifier*/const enum [|{| "isWriteAccess": true, "isDefinition": true, "contextRangeDelta": -1 |}E|] {
////}|]
////[|/*asyncModifier*/async function [|{| "isWriteAccess": true, "isDefinition": true, "contextRangeDelta": -1 |}fn|]() {}|]
////[|/*exportModifier*/export /*defaultModifier*/[|{| "isWriteAccess": true, "isDefinition": true, "contextRangeDelta": -1 |}default|] class [|{| "isWriteAccess": true, "isDefinition": true, "contextRangeDelta": -2 |}C2|] {}|]

const [, classDef1,, aDef,, bDef,, cDef,, dDef,, eDef,, enumDef,, functionDef,, classDef2Default, classDef2Name] = test.ranges();
for (const modifier of ["declareModifier", "abstractModifier"]) {
    verify.referenceGroups(modifier, [{ definition: "class C1", ranges: [classDef1] }]);
}
verify.referenceGroups("staticModifier", [{ definition: "(property) C1.a: any", ranges: [aDef] }]);
verify.referenceGroups("readonlyModifier", [{ definition: "(property) C1.b: any", ranges: [bDef] }]);
verify.referenceGroups("publicModifier", [{ definition: "(property) C1.c: any", ranges: [cDef] }]);
verify.referenceGroups("protectedModifier", [{ definition: "(property) C1.d: any", ranges: [dDef] }]);
verify.referenceGroups("privateModifier", [{ definition: "(property) C1.e: any", ranges: [eDef] }]);
verify.referenceGroups("constModifier", [{ definition: "const enum E", ranges: [enumDef] }]);
verify.referenceGroups("asyncModifier", [{ definition: "function fn(): Promise<void>", ranges: [functionDef] }]);
verify.referenceGroups("exportModifier", [{ definition: "class C2", ranges: [classDef2Name] }]);
verify.referenceGroups("defaultModifier", [{ definition: "class C2", ranges: [classDef2Default] }]);
