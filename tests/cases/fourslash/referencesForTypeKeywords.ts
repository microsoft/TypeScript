/// <reference path='fourslash.ts'/>

////[|{| "id": "interfaceDecl" |}interface [|{| "isWriteAccess": true, "isDefinition": true, "contextRangeId": "interfaceDecl" |}I|] {}|]
////function f<T [|extends|] [|I|]>() {}
////type A1<T, [|{| "isWriteAccess": true, "isDefinition": true |}U|]> = T [|extends|] [|U|] ? 1 : 0;
////type A2<T> = T extends [|infer|] [|{| "isWriteAccess": true, "isDefinition": true |}U|] ? 1 : 0;
////type A3<T> = { [[|{| "id": "mappedType_param" |}[|{| "isWriteAccess": true, "isDefinition": true, "contextRangeId": "mappedType_param" |}P|] [|in|] keyof T|]]: 1 };
////type A4<[|{| "isWriteAccess": true, "isDefinition": true |}T|]> = [|keyof|] [|T|];
////type A5<[|{| "isWriteAccess": true, "isDefinition": true |}T|]> = [|readonly|] [|T|][];

const [
    interfaceDecl,
    interfaceDecl_name,

    typeParam_extendsKeyword,
    typeParam_constraint,

    typeParamA1_name,
    conditionalType_extendsKeyword,
    conditionalType_extendsType,

    inferType_inferKeyword,
    inferType_type,

    mappedType_param,
    mappedType_name,
    mappedType_inOperator,

    typeParamA4_name,
    keyofOperator_keyofKeyword,
    keyofOperator_type,

    typeParamA5_name,
    readonlyOperator_readonlyKeyword,
    readonlyOperator_elementType,
] = test.ranges();

verify.referenceGroups(typeParam_extendsKeyword, [{ definition: "interface I", ranges: [interfaceDecl_name, typeParam_constraint] }]);
verify.referenceGroups(conditionalType_extendsKeyword, [{ definition: "(type parameter) U in type A1<T, U>", ranges: [typeParamA1_name, conditionalType_extendsType] }]);
verify.referenceGroups(inferType_inferKeyword, [{ definition: "(type parameter) U", ranges: [inferType_type] }]);
verify.referenceGroups(mappedType_inOperator, [{ definition: "(type parameter) P", ranges: [mappedType_name] }]);
verify.referenceGroups(keyofOperator_keyofKeyword, [{ definition: "(type parameter) T in type A4<T>", ranges: [typeParamA4_name, keyofOperator_type] }]);
verify.referenceGroups(readonlyOperator_readonlyKeyword, [{ definition: "(type parameter) T in type A5<T>", ranges: [typeParamA5_name, readonlyOperator_elementType] }]);