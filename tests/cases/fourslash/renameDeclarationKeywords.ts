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
verify.baselineRename([
    classDecl1_classKeyword,
    classDecl1_extendsKeyword,
    classDecl1_implementsKeyword,
    getDecl_getKeyword, setDecl_setKeyword,
    interfaceDecl1_interfaceKeyword,
    interfaceDecl1_extendsKeyword,
    typeDecl_typeKeyword,
    enumDecl_enumKeyword,
    namespaceDecl_namespaceKeyword,
    moduleDecl_moduleKeyword,
    functionDecl_functionKeyword,
    varDecl_varKeyword,
    letDecl_letKeyword,
    constDecl_constKeyword,
]);