/// <reference path='fourslash.ts'/>

// @filename: /main.ts
////// import ... = ...
////[|{| "id": "importEqualsDecl1" |}/*importEqualsDecl1_importKeyword*/[|import|] [|{| "isWriteAccess": true, "isDefinition": true, "contextRangeId": "importEqualsDecl1" |}A|] = /*importEqualsDecl1_requireKeyword*/[|require|]("[|{| "isWriteAccess": false, "isDefinition": false, "contextRangeId": "importEqualsDecl1" |}./a|]");|]
////[|{| "id": "namespaceDecl1" |}namespace [|{| "isWriteAccess": true, "isDefinition": true, "contextRangeId": "namespaceDecl1" |}N|] { }|]
////[|{| "id": "importEqualsDecl2" |}/*importEqualsDecl2_importKeyword*/[|import|] [|{| "isWriteAccess": true, "isDefinition": true, "contextRangeId": "importEqualsDecl2" |}N2|] = [|{| "isWriteAccess": true, "isDefinition": true, "contextRangeId": "importEqualsDecl2" |}N|];|]
////
////// import ... from ...
////[|{| "id": "importDecl1" |}/*importDecl1_importKeyword*/[|import|] /*importDecl1_typeKeyword*/[|type|] [|{| "isWriteAccess": true, "isDefinition": true, "contextRangeId": "importDecl1" |}B|] /*importDecl1_fromKeyword*/[|from|] "[|{| "isWriteAccess": false, "isDefinition": false, "contextRangeId": "importDecl1" |}./b|]";|]
////[|{| "id": "importDecl2" |}/*importDecl2_importKeyword*/[|import|] /*importDecl2_typeKeyword*/[|type|] * /*importDecl2_asKeyword*/[|as|] [|{| "isWriteAccess": true, "isDefinition": true, "contextRangeId": "importDecl2" |}C|] /*importDecl2_fromKeyword*/[|from|] "[|{| "isWriteAccess": false, "isDefinition": false, "contextRangeId": "importDecl2" |}./c|]";|]
////[|{| "id": "importDecl3" |}/*importDecl3_importKeyword*/[|import|] /*importDecl3_typeKeyword*/[|type|] { [|{| "isWriteAccess": true, "isDefinition": true, "contextRangeId": "importDecl3" |}D|] } /*importDecl3_fromKeyword*/[|from|] "[|{| "isWriteAccess": false, "isDefinition": false, "contextRangeId": "importDecl3" |}./d|]";|]
////[|{| "id": "importDecl4" |}/*importDecl4_importKeyword*/[|import|] /*importDecl4_typeKeyword*/[|type|] { e1, e2 /*importDecl4_asKeyword*/[|as|] [|{| "isWriteAccess": true, "isDefinition": true, "contextRangeId": "importDecl4" |}e3|] } /*importDecl4_fromKeyword*/[|from|] "[|{| "isWriteAccess": false, "isDefinition": false, "contextRangeId": "importDecl4" |}./e|]";|]
////
////// import "module"
////[|{| "id": "importDecl5" |}/*importDecl5_importKeyword*/[|import|] "[|{| "isWriteAccess": false, "isDefinition": false, "contextRangeId": "importDecl5" |}./f|]";|]
////
////// export ... from ...
////[|{| "id": "exportDecl1" |}/*exportDecl1_exportKeyword*/[|export|] /*exportDecl1_typeKeyword*/[|type|] * /*exportDecl1_fromKeyword*/[|from|] "[|{| "isWriteAccess": false, "isDefinition": false, "contextRangeId": "exportDecl1" |}./g|]";|]
////[|{| "id": "exportDecl2" |}/*exportDecl2_exportKeyword*/[|export|] /*exportDecl2_typeKeyword*/[|type|] [|{| "id": "exportDecl2_namespaceExport" |}* /*exportDecl2_asKeyword*/[|as|] [|{| "isWriteAccess": true, "isDefinition": true, "contextRangeId": "exportDecl2" |}H|]|] /*exportDecl2_fromKeyword*/[|from|] "[|{| "isWriteAccess": false, "isDefinition": false, "contextRangeId": "exportDecl2" |}./h|]";|]
////[|{| "id": "exportDecl3" |}/*exportDecl3_exportKeyword*/[|export|] /*exportDecl3_typeKeyword*/[|type|] { [|{| "isWriteAccess": true, "isDefinition": true, "contextRangeId": "exportDecl3" |}I|] } /*exportDecl3_fromKeyword*/[|from|] "[|{| "isWriteAccess": false, "isDefinition": false, "contextRangeId": "exportDecl3" |}./i|]";|]
////[|{| "id": "exportDecl4" |}/*exportDecl4_exportKeyword*/[|export|] /*exportDecl4_typeKeyword*/[|type|] { j1, j2 /*exportDecl4_asKeyword*/[|as|] [|{| "isWriteAccess": true, "isDefinition": true, "contextRangeId": "exportDecl4" |}j3|] } /*exportDecl4_fromKeyword*/[|from|] "[|{| "isWriteAccess": false, "isDefinition": false, "contextRangeId": "exportDecl4" |}./j|]";|]
////[|{| "id": "typeDecl1" |}type [|{| "isWriteAccess": true, "isDefinition": true, "contextRangeId": "typeDecl1" |}Z1|] = 1;|]
////[|{| "id": "exportDecl5" |}/*exportDecl5_exportKeyword*/[|export|] /*exportDecl5_typeKeyword*/[|type|] { [|{| "isWriteAccess": true, "isDefinition": true, "contextRangeId": "exportDecl5" |}Z1|] };|]
////type Z2 = 2;
////type Z3 = 3;
////[|{| "id": "exportDecl6" |}/*exportDecl6_exportKeyword*/[|export|] /*exportDecl6_typeKeyword*/[|type|] { z2, z3 /*exportDecl6_asKeyword*/[|as|] [|{| "isWriteAccess": true, "isDefinition": true, "contextRangeId": "exportDecl6" |}z4|] };|]

// @filename: /main2.ts
////[|{| "id": "varDecl1" |}const [|{| "isWriteAccess": true, "isDefinition": true, "contextRangeId": "varDecl1" |}x|] = {};|]
////[|{| "id": "exportAssignment1" |}/*exportAssignment1_exportKeyword*/[|export|] = [|{| "isWriteAccess": false, "isDefinition": false, "contextRangeId": "exportAssignment1"|}x|];|]

// @filename: /main3.ts
////[|{| "id": "varDecl3" |}const [|{| "isWriteAccess": true, "isDefinition": true, "contextRangeId": "varDecl3" |}y|] = {};|]
////[|{| "id": "exportAssignment2" |}/*exportAssignment2_exportKeyword*/[|export|] [|default|] [|{| "isWriteAccess": false, "isDefinition": false, "contextRangeId": "exportAssignment2"|}y|];|]

// @filename: /a.ts
////export const a = 1;

// @filename: /b.ts
////[|{| "id": "classDecl1" |}export default class [|{| "isWriteAccess": true, "isDefinition": true, "contextRangeId": "classDecl1" |}B|] {}|]

// @filename: /c.ts
////export const c = 1;

// @filename: /d.ts
////[|{| "id": "classDecl2" |}export class [|{| "isWriteAccess": true, "isDefinition": true, "contextRangeId": "classDecl2" |}D|] {}|]

// @filename: /e.ts
////export const e1 = 1;
////export const e2 = 2;

// @filename: /f.ts
////export const f = 1;

// @filename: /g.ts
////export const g = 1;

// @filename: /h.ts
////export const h = 1;

// @filename: /i.ts
////[|{| "id": "classDecl3" |}export class [|{| "isWriteAccess": true, "isDefinition": true, "contextRangeId": "classDecl3" |}I|] {}|]

// @filename: /j.ts
////export const j1 = 1;
////export const j2 = 2;

verify.baselineFindAllReferences(
    'importEqualsDecl1_importKeyword',
    'importEqualsDecl1_requireKeyword',
    'importEqualsDecl2_importKeyword',
    'importDecl1_importKeyword',
    'importDecl1_typeKeyword',
    'importDecl1_fromKeyword',
    'importDecl2_importKeyword',
    'importDecl2_typeKeyword',
    'importDecl2_asKeyword',
    'importDecl2_fromKeyword',
    'importDecl3_importKeyword',
    'importDecl3_typeKeyword',
    'importDecl3_fromKeyword',
    'importDecl4_importKeyword',
    'importDecl4_typeKeyword',
    'importDecl4_fromKeyword',
    'importDecl4_asKeyword',
    'importDecl5_importKeyword',
    'exportDecl1_exportKeyword',
    'exportDecl1_typeKeyword',
    'exportDecl1_fromKeyword',
    'exportDecl2_exportKeyword',
    'exportDecl2_typeKeyword',
    'exportDecl2_asKeyword',
    'exportDecl2_fromKeyword',
    'exportDecl3_exportKeyword',
    'exportDecl3_typeKeyword',
    'exportDecl3_fromKeyword',
    'exportDecl4_exportKeyword',
    'exportDecl4_typeKeyword',
    'exportDecl4_fromKeyword',
    'exportDecl4_asKeyword',
    'exportDecl5_exportKeyword',
    'exportDecl5_typeKeyword',
    'exportDecl6_exportKeyword',
    'exportDecl6_typeKeyword',
    'exportDecl6_asKeyword',
    'exportAssignment1_exportKeyword',
    'exportAssignment2_exportKeyword',
)
