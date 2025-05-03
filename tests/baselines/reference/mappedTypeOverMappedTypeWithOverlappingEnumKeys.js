//// [tests/cases/compiler/mappedTypeOverMappedTypeWithOverlappingEnumKeys.ts] ////

//// [mappedTypeOverMappedTypeWithOverlappingEnumKeys.ts]
// https://github.com/microsoft/TypeScript/issues/41700

enum EnumA {
    A = 'A',
    B = 'B',
}

// A second enum with at least one key also in EnumA
enum EnumB {
    B = 'B',
    C = 'C',
}

type Mapped = {
    [k in EnumA|EnumB]: string;
};

// Should work
const partial: Partial<Mapped> = {
    [EnumA.B]: 'value',
};


//// [mappedTypeOverMappedTypeWithOverlappingEnumKeys.js]
// https://github.com/microsoft/TypeScript/issues/41700
var _a;
var EnumA;
(function (EnumA) {
    EnumA["A"] = "A";
    EnumA["B"] = "B";
})(EnumA || (EnumA = {}));
// A second enum with at least one key also in EnumA
var EnumB;
(function (EnumB) {
    EnumB["B"] = "B";
    EnumB["C"] = "C";
})(EnumB || (EnumB = {}));
// Should work
var partial = (_a = {},
    _a[EnumA.B] = 'value',
    _a);
