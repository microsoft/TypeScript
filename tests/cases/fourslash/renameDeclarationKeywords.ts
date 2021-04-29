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
] = test.ranges();
verify.renameLocations(classDecl1_classKeyword, [{ range: classDecl1_name }]);
verify.renameLocations(classDecl1_extendsKeyword, [{ range: baseDecl_name }, { range: classDecl1_extendsName }, { range: interfaceDecl1_extendsName }]);
verify.renameLocations(classDecl1_implementsKeyword, [{ range: implemented1Decl_name }, { range: classDecl1_implementsName }]);
for (const keyword of [getDecl_getKeyword, setDecl_setKeyword]) {
    verify.renameLocations(keyword, [{ range: getDecl_name }, { range: setDecl_name }]);
}
verify.renameLocations(interfaceDecl1_interfaceKeyword, [{ range: interfaceDecl1_name }]);
verify.renameLocations(interfaceDecl1_extendsKeyword, [{ range: baseDecl_name }, { range: classDecl1_extendsName }, { range: interfaceDecl1_extendsName }]);
verify.renameLocations(typeDecl_typeKeyword, [{ range: typeDecl_name }]);
verify.renameLocations(enumDecl_enumKeyword, [{ range: enumDecl_name }]);
verify.renameLocations(namespaceDecl_namespaceKeyword, [{ range: namespaceDecl_name }]);
verify.renameLocations(moduleDecl_moduleKeyword, [{ range: moduleDecl_name }]);
verify.renameLocations(functionDecl_functionKeyword, [{ range: functionDecl_name }]);
verify.renameLocations(varDecl_varKeyword, [{ range: varDecl_name }]);
verify.renameLocations(letDecl_letKeyword, [{ range: letDecl_name }]);
verify.renameLocations(constDecl_constKeyword, [{ range: constDecl_name }]);