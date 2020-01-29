/// <reference path='fourslash.ts'/>

////[|[|class|] [|{| "isWriteAccess": true, "isDefinition": true, "contextRangeDelta": -2 |}C|] {
////    [|[|get|] [|{| "isWriteAccess": true, "isDefinition": true, "contextRangeDelta": -2 |}e|]() { return 1; }|]
////    [|[|set|] [|{| "isWriteAccess": true, "isDefinition": true, "contextRangeDelta": -2 |}e|](v) {}|]
////}|]
////[|[|interface|] [|{| "isWriteAccess": true, "isDefinition": true, "contextRangeDelta": -2 |}I|] { }|]
////[|[|type|] [|{| "isWriteAccess": true, "isDefinition": true, "contextRangeDelta": -2 |}T|] = { }|]
////[|[|enum|] [|{| "isWriteAccess": true, "isDefinition": true, "contextRangeDelta": -2 |}E|] { }|]
////[|[|namespace|] [|{| "isWriteAccess": true, "isDefinition": true, "contextRangeDelta": -2 |}N|] { }|]
////[|[|module|] [|{| "isWriteAccess": true, "isDefinition": true, "contextRangeDelta": -2 |}M|] { }|]
////[|[|function|] [|{| "isWriteAccess": true, "isDefinition": true, "contextRangeDelta": -2 |}fn|]() {}|]
////[|[|var|] [|{| "isWriteAccess": false, "isDefinition": true, "contextRangeDelta": -2 |}x|];|]
////[|[|let|] [|{| "isWriteAccess": false, "isDefinition": true, "contextRangeDelta": -2 |}y|];|]
////[|[|const|] [|{| "isWriteAccess": true, "isDefinition": true, "contextRangeDelta": -2 |}z|] = 1;|]

const [
    classDef, classKeyword, className,
    getDef, getKeyword, getName,
    setDef, setKeyword, setName,
    interfaceDef, interfaceKeyword, interfaceName,
    typeDef, typeKeyword, typeName,
    enumDef, enumKeyword, enumName,
    namespaceDef, namespaceKeyword, namespaceName,
    moduleDef, moduleKeyword, moduleName,
    functionDef, functionKeyword, functionName,
    varDef, varKeyword, varName,
    letDef, letKeyword, letName,
    constDef, constKeyword, constName,
] = test.ranges();
verify.renameLocations(classKeyword, [{ range: className }]);
for (const keyword of [getKeyword, setKeyword]) {
    verify.renameLocations(keyword, [{ range: getName }, { range: setName }]);
}
verify.renameLocations(interfaceKeyword, [{ range: interfaceName }]);
verify.renameLocations(typeKeyword, [{ range: typeName }]);
verify.renameLocations(enumKeyword, [{ range: enumName }]);
verify.renameLocations(namespaceKeyword, [{ range: namespaceName }]);
verify.renameLocations(moduleKeyword, [{ range: moduleName }]);
verify.renameLocations(functionKeyword, [{ range: functionName }]);
verify.renameLocations(varKeyword, [{ range: varName }]);
verify.renameLocations(letKeyword, [{ range: letName }]);
verify.renameLocations(constKeyword, [{ range: constName }]);