/// <reference path='fourslash.ts'/>
////[|{| "id": "baseDecl" |}class [|{| "isWriteAccess": true, "isDefinition": true, "contextRangeId": "baseDecl" |}Base|] {}|]
////[|{| "id": "implemented1Decl" |}interface [|{| "isWriteAccess": true, "isDefinition": true, "contextRangeId": "implemented1Decl" |}Implemented1|] {}|]
////[|{| "id": "classDecl1" |}[|class|] [|{| "isWriteAccess": true, "isDefinition": true, "contextRangeId": "classDecl1" |}C1|] [|extends|] [|Base|] [|implements|] [|Implemented1|] {
////    [|{| "id": "getDecl" |}[|get|] [|{| "isWriteAccess": true, "isDefinition": true, "contextRangeId": "getDecl" |}e|]() { return 1; }|]
////    [|{| "id": "setDecl" |}[|set|] [|{| "isWriteAccess": true, "isDefinition": true, "contextRangeId": "setDecl" |}e|](v) {}|]
////}|]
////[|{| "id": "interfaceDecl1" |}[|interface|] [|{| "isWriteAccess": true, "isDefinition": true, "contextRangeId": "interfaceDecl1" |}I1|] [|extends|] [|Base|] { }|]
////[|{| "id": "typeDecl" |}[|type|] [|{| "isWriteAccess": true, "isDefinition": true, "contextRangeId": "typeDecl" |}T|] = { }|]
////[|{| "id": "enumDecl" |}[|enum|] [|{| "isWriteAccess": true, "isDefinition": true, "contextRangeId": "enumDecl" |}E|] { }|]
////[|{| "id": "namespaceDecl" |}[|namespace|] [|{| "isWriteAccess": true, "isDefinition": true, "contextRangeId": "namespaceDecl" |}N|] { }|]
////[|{| "id": "moduleDecl" |}[|module|] [|{| "isWriteAccess": true, "isDefinition": true, "contextRangeId": "moduleDecl" |}M|] { }|]
////[|{| "id": "functionDecl" |}[|function|] [|{| "isWriteAccess": true, "isDefinition": true, "contextRangeId": "functionDecl" |}fn|]() {}|]
////[|{| "id": "varDecl" |}[|var|] [|{| "isWriteAccess": false, "isDefinition": true, "contextRangeId": "varDecl" |}x|];|]
////[|{| "id": "letDecl" |}[|let|] [|{| "isWriteAccess": false, "isDefinition": true, "contextRangeId": "letDecl" |}y|];|]
////[|{| "id": "constDecl" |}[|const|] [|{| "isWriteAccess": true, "isDefinition": true, "contextRangeId": "constDecl" |}z|] = 1;|]
////interface Implemented2 {}
////interface Implemented3 {}
////class C2 [|implements|] Implemented2, Implemented3 {}
////interface I2 [|extends|] Implemented2, Implemented3 {}

const [
    baseDecl,
    baseDecl_name,
    implemented1Decl,
    implemented1Decl_name,
    classDecl1,
    classDecl1_classKeyword,
    classDecl1_name,
    classDecl1_extendsKeyword,
    classDecl1_extendsName,
    classDecl1_implementsKeyword,
    classDecl1_implementsName,
    getDecl,
    getDecl_getKeyword,
    getDecl_name,
    setDecl,
    setDecl_setKeyword,
    setDecl_name,
    interfaceDecl1,
    interfaceDecl1_interfaceKeyword,
    interfaceDecl1_name,
    interfaceDecl1_extendsKeyword,
    interfaceDecl1_extendsName,
    typeDecl,
    typeDecl_typeKeyword,
    typeDecl_name,
    enumDecl,
    enumDecl_enumKeyword,
    enumDecl_name,
    namespaceDecl,
    namespaceDecl_namespaceKeyword,
    namespaceDecl_name,
    moduleDecl,
    moduleDecl_moduleKeyword,
    moduleDecl_name,
    functionDecl,
    functionDecl_functionKeyword,
    functionDecl_name,
    varDecl,
    varDecl_varKeyword,
    varDecl_name,
    letDecl,
    letDecl_letKeyword,
    letDecl_name,
    constDecl,
    constDecl_constKeyword,
    constDecl_name,
    classDecl2_implementsKeyword,
    interfaceDecl2_extendsKeyword,
] = test.ranges();
verify.referenceGroups(classDecl1_classKeyword, [{ definition: "class C1", ranges: [classDecl1_name] }]);
verify.referenceGroups(classDecl1_extendsKeyword, [{ definition: "class Base", ranges: [baseDecl_name, classDecl1_extendsName, interfaceDecl1_extendsName] }]);
verify.referenceGroups(classDecl1_implementsKeyword, [{ definition: "interface Implemented1", ranges: [implemented1Decl_name, classDecl1_implementsName] }]);
for (const keyword of [getDecl_getKeyword, setDecl_setKeyword]) {
    verify.referenceGroups(keyword, [{ definition: "(property) C1.e: number", ranges: [getDecl_name, setDecl_name] }]);
}
verify.referenceGroups(interfaceDecl1_interfaceKeyword, [{ definition: "interface I1", ranges: [interfaceDecl1_name] }]);
verify.referenceGroups(interfaceDecl1_extendsKeyword, [{ definition: "class Base", ranges: [baseDecl_name, classDecl1_extendsName, interfaceDecl1_extendsName] }]);
verify.referenceGroups(typeDecl_typeKeyword, [{ definition: "type T = {}", ranges: [typeDecl_name] }]);
verify.referenceGroups(enumDecl_enumKeyword, [{ definition: "enum E", ranges: [enumDecl_name] }]);
verify.referenceGroups(namespaceDecl_namespaceKeyword, [{ definition: "namespace N", ranges: [namespaceDecl_name] }]);
verify.referenceGroups(moduleDecl_moduleKeyword, [{ definition: "namespace M", ranges: [moduleDecl_name] }]);
verify.referenceGroups(functionDecl_functionKeyword, [{ definition: "function fn(): void", ranges: [functionDecl_name] }]);
verify.referenceGroups(varDecl_varKeyword, [{ definition: "var x: any", ranges: [varDecl_name] }]);
verify.referenceGroups(letDecl_letKeyword, [{ definition: "let y: any", ranges: [letDecl_name] }]);
verify.referenceGroups(constDecl_constKeyword, [{ definition: "const z: 1", ranges: [constDecl_name] }]);
verify.noReferences(classDecl2_implementsKeyword);
verify.noReferences(interfaceDecl2_extendsKeyword);