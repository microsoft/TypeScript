//// [unionTypeIndexSignature.ts]
var numOrDate: number | Date;
var anyVar: number;

// If each type in U has a string index signature, 
// U has a string index signature of a union type of the types of the string index signatures from each type in U.

var unionOfDifferentReturnType: { [a: string]: number; } | { [a: string]: Date; };
numOrDate = unionOfDifferentReturnType["hello"]; // number | Date
numOrDate = unionOfDifferentReturnType[10]; // number | Date

var unionOfTypesWithAndWithoutStringSignature: { [a: string]: number; } | boolean;
anyVar = unionOfTypesWithAndWithoutStringSignature["hello"]; // any
anyVar = unionOfTypesWithAndWithoutStringSignature[10]; // any

// If each type in U has a numeric index signature, 
// U has a numeric index signature of a union type of the types of the numeric index signatures from each type in U.
var unionOfDifferentReturnType1: { [a: number]: number; } | { [a: number]: Date; };
numOrDate = unionOfDifferentReturnType1["hello"]; // any
numOrDate = unionOfDifferentReturnType1[10]; // number | Date

var unionOfTypesWithAndWithoutStringSignature1: { [a: number]: number; } | boolean;
anyVar = unionOfTypesWithAndWithoutStringSignature1["hello"]; // any
anyVar = unionOfTypesWithAndWithoutStringSignature1[10]; // any

//// [unionTypeIndexSignature.js]
var numOrDate;
var anyVar;
// If each type in U has a string index signature, 
// U has a string index signature of a union type of the types of the string index signatures from each type in U.
var unionOfDifferentReturnType;
numOrDate = unionOfDifferentReturnType["hello"]; // number | Date
numOrDate = unionOfDifferentReturnType[10]; // number | Date
var unionOfTypesWithAndWithoutStringSignature;
anyVar = unionOfTypesWithAndWithoutStringSignature["hello"]; // any
anyVar = unionOfTypesWithAndWithoutStringSignature[10]; // any
// If each type in U has a numeric index signature, 
// U has a numeric index signature of a union type of the types of the numeric index signatures from each type in U.
var unionOfDifferentReturnType1;
numOrDate = unionOfDifferentReturnType1["hello"]; // any
numOrDate = unionOfDifferentReturnType1[10]; // number | Date
var unionOfTypesWithAndWithoutStringSignature1;
anyVar = unionOfTypesWithAndWithoutStringSignature1["hello"]; // any
anyVar = unionOfTypesWithAndWithoutStringSignature1[10]; // any
