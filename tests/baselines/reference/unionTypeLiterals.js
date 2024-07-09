//// [tests/cases/conformance/types/specifyingTypes/typeLiterals/unionTypeLiterals.ts] ////

//// [unionTypeLiterals.ts]
// basic valid forms of union literals

var simpleUnion: string | number;
var unionOfUnion: string | number | boolean;

var arrayOfUnions: (string | number)[];
var arrayOfUnions: Array<string | number>;

var unionOfFunctionType: (() => string) | (() => number);
var unionOfFunctionType: { (): string } | { (): number };
var unionOfFunctionType: () => string | number;

var unionOfConstructorType: (new () => string) | (new () => number);
var unionOfConstructorType: { new (): string } | { new (): number };
var unionOfConstructorType: new () => string | number;

//// [unionTypeLiterals.js]
// basic valid forms of union literals
var simpleUnion;
var unionOfUnion;
var arrayOfUnions;
var arrayOfUnions;
var unionOfFunctionType;
var unionOfFunctionType;
var unionOfFunctionType;
var unionOfConstructorType;
var unionOfConstructorType;
var unionOfConstructorType;
