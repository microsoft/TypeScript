/// <reference path='fourslash.ts'/>

////[|/*classKeyword*/class [|{| "isWriteAccess": true, "isDefinition": true, "contextRangeDelta": -1 |}C|] {
////    [|/*getKeyword*/get [|{| "isWriteAccess": true, "isDefinition": true, "contextRangeDelta": -1 |}e|]() { return 1; }|]
////    [|/*setKeyword*/set [|{| "isWriteAccess": true, "isDefinition": true, "contextRangeDelta": -1 |}e|](v) {}|]
////}|]
////[|/*interfaceKeyword*/interface [|{| "isWriteAccess": true, "isDefinition": true, "contextRangeDelta": -1 |}I|] { }|]
////[|/*typeKeyword*/type [|{| "isWriteAccess": true, "isDefinition": true, "contextRangeDelta": -1 |}T|] = { }|]
////[|/*enumKeyword*/enum [|{| "isWriteAccess": true, "isDefinition": true, "contextRangeDelta": -1 |}E|] { }|]
////[|/*namespaceKeyword*/namespace [|{| "isWriteAccess": true, "isDefinition": true, "contextRangeDelta": -1 |}N|] { }|]
////[|/*moduleKeyword*/module [|{| "isWriteAccess": true, "isDefinition": true, "contextRangeDelta": -1 |}M|] { }|]
////[|/*functionKeyword*/function [|{| "isWriteAccess": true, "isDefinition": true, "contextRangeDelta": -1 |}fn|]() {}|]
////[|/*varKeyword*/var [|{| "isWriteAccess": false, "isDefinition": true, "contextRangeDelta": -1 |}x|];|]
////[|/*letKeyword*/let [|{| "isWriteAccess": false, "isDefinition": true, "contextRangeDelta": -1 |}y|];|]
////[|/*constKeyword*/const [|{| "isWriteAccess": true, "isDefinition": true, "contextRangeDelta": -1 |}z|] = 1;|]

const [, classDef,, getDef,, setDef,, interfaceDef,, typeDef,, enumDef,, namespaceDef,, moduleDef,, functionDef,, varDef,, letDef,, constDef] = test.ranges();
verify.referenceGroups("classKeyword", [{ definition: "class C", ranges: [classDef] }]);
for (const keyword of ["getKeyword", "setKeyword"]) {
    verify.referenceGroups(keyword, [{ definition: "(property) C.e: number", ranges: [getDef, setDef] }]);
}
verify.referenceGroups("interfaceKeyword", [{ definition: "interface I", ranges: [interfaceDef] }]);
verify.referenceGroups("typeKeyword", [{ definition: "type T = {}", ranges: [typeDef] }]);
verify.referenceGroups("enumKeyword", [{ definition: "enum E", ranges: [enumDef] }]);
verify.referenceGroups("namespaceKeyword", [{ definition: "namespace N", ranges: [namespaceDef] }]);
verify.referenceGroups("moduleKeyword", [{ definition: "namespace M", ranges: [moduleDef] }]);
verify.referenceGroups("functionKeyword", [{ definition: "function fn(): void", ranges: [functionDef] }]);
verify.referenceGroups("varKeyword", [{ definition: "var x: any", ranges: [varDef] }]);
verify.referenceGroups("letKeyword", [{ definition: "let y: any", ranges: [letDef] }]);
verify.referenceGroups("constKeyword", [{ definition: "const z: 1", ranges: [constDef] }]);