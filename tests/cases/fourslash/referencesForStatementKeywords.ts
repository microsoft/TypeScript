/// <reference path='fourslash.ts'/>

// @filename: /main.ts
////// import ... = ...
////[|{| "id": "importEqualsDecl1" |}[|import|] [|{| "isWriteAccess": true, "isDefinition": true, "contextRangeId": "importEqualsDecl1" |}A|] = [|require|]("[|{| "isWriteAccess": false, "isDefinition": false, "contextRangeId": "importEqualsDecl1" |}./a|]");|]
////[|{| "id": "namespaceDecl1" |}namespace [|{| "isWriteAccess": true, "isDefinition": true, "contextRangeId": "namespaceDecl1" |}N|] { }|]
////[|{| "id": "importEqualsDecl2" |}[|import|] [|{| "isWriteAccess": true, "isDefinition": true, "contextRangeId": "importEqualsDecl2" |}N2|] = [|{| "isWriteAccess": true, "isDefinition": true, "contextRangeId": "importEqualsDecl2" |}N|];|]
////
////// import ... from ...
////[|{| "id": "importDecl1" |}[|import|] [|type|] [|{| "isWriteAccess": true, "isDefinition": true, "contextRangeId": "importDecl1" |}B|] [|from|] "[|{| "isWriteAccess": false, "isDefinition": false, "contextRangeId": "importDecl1" |}./b|]";|]
////[|{| "id": "importDecl2" |}[|import|] [|type|] * [|as|] [|{| "isWriteAccess": true, "isDefinition": true, "contextRangeId": "importDecl2" |}C|] [|from|] "[|{| "isWriteAccess": false, "isDefinition": false, "contextRangeId": "importDecl2" |}./c|]";|]
////[|{| "id": "importDecl3" |}[|import|] [|type|] { [|{| "isWriteAccess": true, "isDefinition": true, "contextRangeId": "importDecl3" |}D|] } [|from|] "[|{| "isWriteAccess": false, "isDefinition": false, "contextRangeId": "importDecl3" |}./d|]";|]
////[|{| "id": "importDecl4" |}[|import|] [|type|] { e1, e2 [|as|] [|{| "isWriteAccess": true, "isDefinition": true, "contextRangeId": "importDecl4" |}e3|] } [|from|] "[|{| "isWriteAccess": false, "isDefinition": false, "contextRangeId": "importDecl4" |}./e|]";|]
////
////// import "module"
////[|{| "id": "importDecl5" |}[|import|] "[|{| "isWriteAccess": false, "isDefinition": false, "contextRangeId": "importDecl5" |}./f|]";|]
////
////// export ... from ...
////[|{| "id": "exportDecl1" |}[|export|] [|type|] * [|from|] "[|{| "isWriteAccess": false, "isDefinition": false, "contextRangeId": "exportDecl1" |}./g|]";|]
////[|{| "id": "exportDecl2" |}[|export|] [|type|] [|{| "id": "exportDecl2_namespaceExport" |}* [|as|] [|{| "isWriteAccess": true, "isDefinition": true, "contextRangeId": "exportDecl2" |}H|]|] [|from|] "[|{| "isWriteAccess": false, "isDefinition": false, "contextRangeId": "exportDecl2" |}./h|]";|]
////[|{| "id": "exportDecl3" |}[|export|] [|type|] { [|{| "isWriteAccess": true, "isDefinition": true, "contextRangeId": "exportDecl3" |}I|] } [|from|] "[|{| "isWriteAccess": false, "isDefinition": false, "contextRangeId": "exportDecl3" |}./i|]";|]
////[|{| "id": "exportDecl4" |}[|export|] [|type|] { j1, j2 [|as|] [|{| "isWriteAccess": true, "isDefinition": true, "contextRangeId": "exportDecl4" |}j3|] } [|from|] "[|{| "isWriteAccess": false, "isDefinition": false, "contextRangeId": "exportDecl4" |}./j|]";|]
////[|{| "id": "typeDecl1" |}type [|{| "isWriteAccess": true, "isDefinition": true, "contextRangeId": "typeDecl1" |}Z1|] = 1;|]
////[|{| "id": "exportDecl5" |}[|export|] [|type|] { [|{| "isWriteAccess": true, "isDefinition": true, "contextRangeId": "exportDecl5" |}Z1|] };|]
////type Z2 = 2;
////type Z3 = 3;
////[|{| "id": "exportDecl6" |}[|export|] [|type|] { z2, z3 [|as|] [|{| "isWriteAccess": true, "isDefinition": true, "contextRangeId": "exportDecl6" |}z4|] };|]

// @filename: /main2.ts
////[|{| "id": "varDecl1" |}const [|{| "isWriteAccess": true, "isDefinition": true, "contextRangeId": "varDecl1" |}x|] = {};|]
////[|{| "id": "exportAssignment1" |}[|export|] = [|{| "isWriteAccess": false, "isDefinition": false, "contextRangeId": "exportAssignment1"|}x|];|]

// @filename: /main3.ts
////[|{| "id": "varDecl3" |}const [|{| "isWriteAccess": true, "isDefinition": true, "contextRangeId": "varDecl3" |}y|] = {};|]
////[|{| "id": "exportAssignment2" |}[|export|] [|default|] [|{| "isWriteAccess": false, "isDefinition": false, "contextRangeId": "exportAssignment2"|}y|];|]

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

const [
    // main.ts
    importEqualsDecl1,
    importEqualsDecl1_importKeyword,
    importEqualsDecl1_name,
    importEqualsDecl1_requireKeyword,
    importEqualsDecl1_module,

    namespaceDecl1,
    namespaceDecl1_name,

    importEqualsDecl2,
    importEqualsDecl2_importKeyword,
    importEqualsDecl2_name,
    importEqualsDecl2_reference,

    importDecl1,
    importDecl1_importKeyword,
    importDecl1_typeKeyword,
    importDecl1_name,
    importDecl1_fromKeyword,
    importDecl1_module,

    importDecl2,
    importDecl2_importKeyword,
    importDecl2_typeKeyword,
    importDecl2_asKeyword,
    importDecl2_name,
    importDecl2_fromKeyword,
    importDecl2_module,

    importDecl3,
    importDecl3_importKeyword,
    importDecl3_typeKeyword,
    importDecl3_name,
    importDecl3_fromKeyword,
    importDecl3_module,

    importDecl4,
    importDecl4_importKeyword,
    importDecl4_typeKeyword,
    importDecl4_asKeyword,
    importDecl4_name,
    importDecl4_fromKeyword,
    importDecl4_module,

    importDecl5,
    importDecl5_importKeyword,
    importDecl5_module,

    exportDecl1,
    exportDecl1_exportKeyword,
    exportDecl1_typeKeyword,
    exportDecl1_fromKeyword,
    exportDecl1_module,

    exportDecl2,
    exportDecl2_exportKeyword,
    exportDecl2_typeKeyword,
    exportDecl2_namespaceExport,
    exportDecl2_asKeyword,
    exportDecl2_name,
    exportDecl2_fromKeyword,
    exportDecl2_module,

    exportDecl3,
    exportDecl3_exportKeyword,
    exportDecl3_typeKeyword,
    exportDecl3_name,
    exportDecl3_fromKeyword,
    exportDecl3_module,

    exportDecl4,
    exportDecl4_exportKeyword,
    exportDecl4_typeKeyword,
    exportDecl4_asKeyword,
    exportDecl4_name,
    exportDecl4_fromKeyword,
    exportDecl4_module,

    typeDecl1,
    typeDecl1_name,

    exportDecl5,
    exportDecl5_exportKeyword,
    exportDecl5_typeKeyword,
    exportDecl5_name,

    exportDecl6,
    exportDecl6_exportKeyword,
    exportDecl6_typeKeyword,
    exportDecl6_asKeyword,
    exportDecl6_name,

    // main2.ts
    varDecl1,
    varDecl1_name,

    exportAssignment1,
    exportAssignment1_exportKeyword,
    exportAssignment1_name,

    // main3.ts
    varDecl2,
    varDecl2_name,

    exportAssignment2,
    exportAssignment2_exportKeyword,
    exportAssignment2_defaultKeyword,
    exportAssignment2_name,

    // a.ts
    // b.ts
    classDecl1,
    classDecl1_name,

    // c.ts
    // d.ts
    classDecl2,
    classDecl2_name,

    // e.ts
    // f.ts
    // g.ts
    // h.ts
    // i.ts
    classDecl3,
    classDecl3_name,
    // j.ts

] = test.ranges();


// importEqualsDecl1:
verify.referenceGroups(importEqualsDecl1_importKeyword, [{ definition: "import A = require(\"./a\")", ranges: [importEqualsDecl1_name] }]);
verify.referenceGroups(importEqualsDecl1_requireKeyword, [{ definition: "module \"/a\"", ranges: [importEqualsDecl1_module] }]);

// importEqualsDecl2:
verify.referenceGroups(importEqualsDecl2_importKeyword, [{ definition: "(alias) namespace N2\nimport N2 = N", ranges: [importEqualsDecl2_name] }]);

// importDecl1:
verify.referenceGroups([importDecl1_importKeyword, importDecl1_typeKeyword], [
    { definition: "(alias) class B\nimport B", ranges: [importDecl1_name] },
    { definition: "class B", ranges: [classDecl1_name] }
]);
verify.referenceGroups(importDecl1_fromKeyword, [{ definition: "module \"/b\"", ranges: [importDecl1_module] }]);

// importDecl2:
verify.referenceGroups([importDecl2_importKeyword, importDecl2_typeKeyword, importDecl2_asKeyword], [{ definition: "import C", ranges: [importDecl2_name] }]);
verify.referenceGroups([importDecl2_fromKeyword], [{ definition: "module \"/c\"", ranges: [importDecl2_module] }]);

// importDecl3:
verify.referenceGroups([importDecl3_importKeyword, importDecl3_typeKeyword], [
    { definition: "(alias) class D\nimport D", ranges: [importDecl3_name] },
    { definition: "class D", ranges: [classDecl2_name] }
]);
verify.referenceGroups(importDecl3_fromKeyword, [{ definition: "module \"/d\"", ranges: [importDecl3_module] }]);

// importDecl4:
verify.noReferences(importDecl4_importKeyword);
verify.noReferences(importDecl4_typeKeyword);
verify.referenceGroups(importDecl4_fromKeyword, [{ definition: "module \"/e\"", ranges: [importDecl4_module] }]);
verify.referenceGroups(importDecl4_asKeyword, [{ definition: "(alias) const e3: 2\nimport e3", ranges: [importDecl4_name] }]);

// importDecl5
verify.referenceGroups(importDecl5_importKeyword, [{ definition: "module \"/f\"", ranges: [importDecl5_module] }]);

// exportDecl1:
verify.referenceGroups([exportDecl1_exportKeyword, exportDecl1_typeKeyword, exportDecl1_fromKeyword], [{ definition: "module \"/g\"", ranges: [exportDecl1_module] }]);

// exportDecl2:
verify.referenceGroups([exportDecl2_exportKeyword, exportDecl2_typeKeyword, exportDecl2_asKeyword], [{ definition: "import H", ranges: [exportDecl2_name] }]);
verify.referenceGroups([exportDecl2_fromKeyword], [{ definition: "module \"/h\"", ranges: [exportDecl2_module] }]);

// exportDecl3:
verify.referenceGroups([exportDecl3_exportKeyword, exportDecl3_typeKeyword], [
    { definition: "(alias) class I\nexport I", ranges: [exportDecl3_name] },
    { definition: "class I", ranges: [classDecl3_name] }
]);
verify.referenceGroups(exportDecl3_fromKeyword, [{ definition: "module \"/i\"", ranges: [exportDecl3_module] }]);

// exportDecl4:
verify.noReferences(exportDecl4_exportKeyword);
verify.noReferences(exportDecl4_typeKeyword);
verify.referenceGroups(exportDecl4_fromKeyword, [{ definition: "module \"/j\"", ranges: [exportDecl4_module] }]);
verify.referenceGroups(exportDecl4_asKeyword, [{ definition: "(alias) const j3: 2\nexport j3", ranges: [exportDecl4_name] }]);

// exportDecl5:
verify.referenceGroups([exportDecl5_exportKeyword, exportDecl5_typeKeyword], [{ definition: "type Z1 = 1", ranges: [typeDecl1_name, exportDecl5_name] }]);

// exportDecl6:
verify.noReferences(exportDecl6_exportKeyword);
verify.noReferences(exportDecl6_typeKeyword);
verify.referenceGroups(exportDecl6_asKeyword, [{ definition: "export z4", ranges: [exportDecl6_name] }]);

// exportAssignment1:
verify.referenceGroups(exportAssignment1_exportKeyword, [
    { definition: "const x: {}", ranges: [varDecl1_name, exportAssignment1_name] }
]);

// exportAssignment2:
verify.referenceGroups(exportAssignment2_exportKeyword, [
    { definition: "const y: {}", ranges: [varDecl2_name, exportAssignment2_name] }
]);
