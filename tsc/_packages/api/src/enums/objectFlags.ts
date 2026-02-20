//
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// !!! THIS FILE IS AUTO-GENERATED — DO NOT EDIT !!!
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//
// Source: internal/checker/types.go
// Regenerate: npx hereby generate:enums
//
export var ObjectFlags: any;
(function (ObjectFlags) {
    ObjectFlags[ObjectFlags["None"] = 0] = "None";
    ObjectFlags[ObjectFlags["Class"] = 1] = "Class";
    ObjectFlags[ObjectFlags["Interface"] = 2] = "Interface";
    ObjectFlags[ObjectFlags["Reference"] = 4] = "Reference";
    ObjectFlags[ObjectFlags["Tuple"] = 8] = "Tuple";
    ObjectFlags[ObjectFlags["Anonymous"] = 16] = "Anonymous";
    ObjectFlags[ObjectFlags["Mapped"] = 32] = "Mapped";
    ObjectFlags[ObjectFlags["Instantiated"] = 64] = "Instantiated";
    ObjectFlags[ObjectFlags["ObjectLiteral"] = 128] = "ObjectLiteral";
    ObjectFlags[ObjectFlags["EvolvingArray"] = 256] = "EvolvingArray";
    ObjectFlags[ObjectFlags["ObjectLiteralPatternWithComputedProperties"] = 512] = "ObjectLiteralPatternWithComputedProperties";
    ObjectFlags[ObjectFlags["ReverseMapped"] = 1024] = "ReverseMapped";
    ObjectFlags[ObjectFlags["JsxAttributes"] = 2048] = "JsxAttributes";
    ObjectFlags[ObjectFlags["JSLiteral"] = 4096] = "JSLiteral";
    ObjectFlags[ObjectFlags["FreshLiteral"] = 8192] = "FreshLiteral";
    ObjectFlags[ObjectFlags["ArrayLiteral"] = 16384] = "ArrayLiteral";
    ObjectFlags[ObjectFlags["PrimitiveUnion"] = 32768] = "PrimitiveUnion";
    ObjectFlags[ObjectFlags["ContainsWideningType"] = 65536] = "ContainsWideningType";
    ObjectFlags[ObjectFlags["ContainsObjectOrArrayLiteral"] = 131072] = "ContainsObjectOrArrayLiteral";
    ObjectFlags[ObjectFlags["NonInferrableType"] = 262144] = "NonInferrableType";
    ObjectFlags[ObjectFlags["CouldContainTypeVariablesComputed"] = 524288] = "CouldContainTypeVariablesComputed";
    ObjectFlags[ObjectFlags["CouldContainTypeVariables"] = 1048576] = "CouldContainTypeVariables";
    ObjectFlags[ObjectFlags["MembersResolved"] = 2097152] = "MembersResolved";
    ObjectFlags[ObjectFlags["ClassOrInterface"] = 3] = "ClassOrInterface";
    ObjectFlags[ObjectFlags["RequiresWidening"] = 196608] = "RequiresWidening";
    ObjectFlags[ObjectFlags["PropagatingFlags"] = 458752] = "PropagatingFlags";
    ObjectFlags[ObjectFlags["InstantiatedMapped"] = 96] = "InstantiatedMapped";
    ObjectFlags[ObjectFlags["InstantiationExpressionType"] = 16777216] = "InstantiationExpressionType";
    ObjectFlags[ObjectFlags["SingleSignatureType"] = 33554432] = "SingleSignatureType";
    ObjectFlags[ObjectFlags["ObjectTypeKindMask"] = 50332991] = "ObjectTypeKindMask";
    ObjectFlags[ObjectFlags["ContainsSpread"] = 4194304] = "ContainsSpread";
    ObjectFlags[ObjectFlags["ObjectRestType"] = 8388608] = "ObjectRestType";
    ObjectFlags[ObjectFlags["IsClassInstanceClone"] = 67108864] = "IsClassInstanceClone";
    ObjectFlags[ObjectFlags["IdenticalBaseTypeCalculated"] = 134217728] = "IdenticalBaseTypeCalculated";
    ObjectFlags[ObjectFlags["IdenticalBaseTypeExists"] = 268435456] = "IdenticalBaseTypeExists";
    ObjectFlags[ObjectFlags["IsGenericTypeComputed"] = 4194304] = "IsGenericTypeComputed";
    ObjectFlags[ObjectFlags["IsGenericObjectType"] = 8388608] = "IsGenericObjectType";
    ObjectFlags[ObjectFlags["IsGenericIndexType"] = 16777216] = "IsGenericIndexType";
    ObjectFlags[ObjectFlags["IsGenericType"] = 25165824] = "IsGenericType";
    ObjectFlags[ObjectFlags["ContainsIntersections"] = 33554432] = "ContainsIntersections";
    ObjectFlags[ObjectFlags["IsUnknownLikeUnionComputed"] = 67108864] = "IsUnknownLikeUnionComputed";
    ObjectFlags[ObjectFlags["IsUnknownLikeUnion"] = 134217728] = "IsUnknownLikeUnion";
    ObjectFlags[ObjectFlags["IsNeverIntersectionComputed"] = 33554432] = "IsNeverIntersectionComputed";
    ObjectFlags[ObjectFlags["IsNeverIntersection"] = 67108864] = "IsNeverIntersection";
    ObjectFlags[ObjectFlags["IsConstrainedTypeVariable"] = 134217728] = "IsConstrainedTypeVariable";
})(ObjectFlags || (ObjectFlags = {}));
