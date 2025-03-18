//// [tests/cases/conformance/types/objectTypeLiteral/propertySignatures/stringNamedPropertyDuplicates.ts] ////

//// [stringNamedPropertyDuplicates.ts]
class C {
    "a b": number;
    "a b": number;
    static "c d": number;
    static "c d": number;
}

interface I {
    "a b": number;
    "a b": number;
}

var a: {
    "a b": number;
    "a b": number;
}

var b = {
    "a b": 1
    "a b": 1
}

//// [stringNamedPropertyDuplicates.js]
class C {
    "a b";
    "a b";
    static "c d";
    static "c d";
}
var a;
var b = {
    "a b": 1,
    "a b": 1
};
