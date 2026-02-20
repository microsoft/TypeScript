//
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// !!! THIS FILE IS AUTO-GENERATED — DO NOT EDIT !!!
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//
// Source: internal/checker/types.go
// Regenerate: npx hereby generate:enums
//
export var TypeFlags: any;
(function (TypeFlags) {
    TypeFlags[TypeFlags["None"] = 0] = "None";
    TypeFlags[TypeFlags["Any"] = 1] = "Any";
    TypeFlags[TypeFlags["Unknown"] = 2] = "Unknown";
    TypeFlags[TypeFlags["Undefined"] = 4] = "Undefined";
    TypeFlags[TypeFlags["Null"] = 8] = "Null";
    TypeFlags[TypeFlags["Void"] = 16] = "Void";
    TypeFlags[TypeFlags["String"] = 32] = "String";
    TypeFlags[TypeFlags["Number"] = 64] = "Number";
    TypeFlags[TypeFlags["BigInt"] = 128] = "BigInt";
    TypeFlags[TypeFlags["Boolean"] = 256] = "Boolean";
    TypeFlags[TypeFlags["ESSymbol"] = 512] = "ESSymbol";
    TypeFlags[TypeFlags["StringLiteral"] = 1024] = "StringLiteral";
    TypeFlags[TypeFlags["NumberLiteral"] = 2048] = "NumberLiteral";
    TypeFlags[TypeFlags["BigIntLiteral"] = 4096] = "BigIntLiteral";
    TypeFlags[TypeFlags["BooleanLiteral"] = 8192] = "BooleanLiteral";
    TypeFlags[TypeFlags["UniqueESSymbol"] = 16384] = "UniqueESSymbol";
    TypeFlags[TypeFlags["EnumLiteral"] = 32768] = "EnumLiteral";
    TypeFlags[TypeFlags["Enum"] = 65536] = "Enum";
    TypeFlags[TypeFlags["NonPrimitive"] = 131072] = "NonPrimitive";
    TypeFlags[TypeFlags["Never"] = 262144] = "Never";
    TypeFlags[TypeFlags["TypeParameter"] = 524288] = "TypeParameter";
    TypeFlags[TypeFlags["Object"] = 1048576] = "Object";
    TypeFlags[TypeFlags["Index"] = 2097152] = "Index";
    TypeFlags[TypeFlags["TemplateLiteral"] = 4194304] = "TemplateLiteral";
    TypeFlags[TypeFlags["StringMapping"] = 8388608] = "StringMapping";
    TypeFlags[TypeFlags["Substitution"] = 16777216] = "Substitution";
    TypeFlags[TypeFlags["IndexedAccess"] = 33554432] = "IndexedAccess";
    TypeFlags[TypeFlags["Conditional"] = 67108864] = "Conditional";
    TypeFlags[TypeFlags["Union"] = 134217728] = "Union";
    TypeFlags[TypeFlags["Intersection"] = 268435456] = "Intersection";
    TypeFlags[TypeFlags["Reserved1"] = 536870912] = "Reserved1";
    TypeFlags[TypeFlags["Reserved2"] = 1073741824] = "Reserved2";
    TypeFlags[TypeFlags["Reserved3"] = -2147483648] = "Reserved3";
    TypeFlags[TypeFlags["AnyOrUnknown"] = 3] = "AnyOrUnknown";
    TypeFlags[TypeFlags["Nullable"] = 12] = "Nullable";
    TypeFlags[TypeFlags["Literal"] = 15360] = "Literal";
    TypeFlags[TypeFlags["Unit"] = 97292] = "Unit";
    TypeFlags[TypeFlags["Freshable"] = 80896] = "Freshable";
    TypeFlags[TypeFlags["StringOrNumberLiteral"] = 3072] = "StringOrNumberLiteral";
    TypeFlags[TypeFlags["StringOrNumberLiteralOrUnique"] = 19456] = "StringOrNumberLiteralOrUnique";
    TypeFlags[TypeFlags["DefinitelyFalsy"] = 15388] = "DefinitelyFalsy";
    TypeFlags[TypeFlags["PossiblyFalsy"] = 15868] = "PossiblyFalsy";
    TypeFlags[TypeFlags["Intrinsic"] = 393983] = "Intrinsic";
    TypeFlags[TypeFlags["StringLike"] = 12583968] = "StringLike";
    TypeFlags[TypeFlags["NumberLike"] = 67648] = "NumberLike";
    TypeFlags[TypeFlags["BigIntLike"] = 4224] = "BigIntLike";
    TypeFlags[TypeFlags["BooleanLike"] = 8448] = "BooleanLike";
    TypeFlags[TypeFlags["EnumLike"] = 98304] = "EnumLike";
    TypeFlags[TypeFlags["ESSymbolLike"] = 16896] = "ESSymbolLike";
    TypeFlags[TypeFlags["VoidLike"] = 20] = "VoidLike";
    TypeFlags[TypeFlags["Primitive"] = 12713980] = "Primitive";
    TypeFlags[TypeFlags["DefinitelyNonNullable"] = 13893600] = "DefinitelyNonNullable";
    TypeFlags[TypeFlags["DisjointDomains"] = 12812284] = "DisjointDomains";
    TypeFlags[TypeFlags["UnionOrIntersection"] = 402653184] = "UnionOrIntersection";
    TypeFlags[TypeFlags["StructuredType"] = 403701760] = "StructuredType";
    TypeFlags[TypeFlags["TypeVariable"] = 34078720] = "TypeVariable";
    TypeFlags[TypeFlags["InstantiableNonPrimitive"] = 117964800] = "InstantiableNonPrimitive";
    TypeFlags[TypeFlags["InstantiablePrimitive"] = 14680064] = "InstantiablePrimitive";
    TypeFlags[TypeFlags["Instantiable"] = 132644864] = "Instantiable";
    TypeFlags[TypeFlags["StructuredOrInstantiable"] = 536346624] = "StructuredOrInstantiable";
    TypeFlags[TypeFlags["ObjectFlagsType"] = 403963917] = "ObjectFlagsType";
    TypeFlags[TypeFlags["Simplifiable"] = 102760448] = "Simplifiable";
    TypeFlags[TypeFlags["Singleton"] = 394239] = "Singleton";
    TypeFlags[TypeFlags["Narrowable"] = 536575971] = "Narrowable";
    TypeFlags[TypeFlags["IncludesMask"] = 416808959] = "IncludesMask";
    TypeFlags[TypeFlags["IncludesMissingType"] = 524288] = "IncludesMissingType";
    TypeFlags[TypeFlags["IncludesNonWideningType"] = 2097152] = "IncludesNonWideningType";
    TypeFlags[TypeFlags["IncludesWildcard"] = 33554432] = "IncludesWildcard";
    TypeFlags[TypeFlags["IncludesEmptyObject"] = 67108864] = "IncludesEmptyObject";
    TypeFlags[TypeFlags["IncludesInstantiable"] = 16777216] = "IncludesInstantiable";
    TypeFlags[TypeFlags["IncludesConstrainedTypeVariable"] = 536870912] = "IncludesConstrainedTypeVariable";
    TypeFlags[TypeFlags["IncludesError"] = 1073741824] = "IncludesError";
    TypeFlags[TypeFlags["NotPrimitiveUnion"] = 286523411] = "NotPrimitiveUnion";
})(TypeFlags || (TypeFlags = {}));
