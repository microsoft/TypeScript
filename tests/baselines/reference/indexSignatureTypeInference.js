//// [tests/cases/conformance/types/typeRelationships/typeInference/indexSignatureTypeInference.ts] ////

//// [indexSignatureTypeInference.ts]
interface NumberMap<T> {
    [index: number]: T;
}

interface StringMap<T> {
    [index: string]: T;
}

declare function numberMapToArray<T>(object: NumberMap<T>): T[];
declare function stringMapToArray<T>(object: StringMap<T>): T[];

var numberMap: NumberMap<Function>;
var stringMap: StringMap<Function>;

var v1: Function[];
var v1 = numberMapToArray(numberMap);  // Ok
var v1 = numberMapToArray(stringMap);  // Ok
var v1 = stringMapToArray(numberMap);  // Error expected here
var v1 = stringMapToArray(stringMap);  // Ok


//// [indexSignatureTypeInference.js]
var numberMap;
var stringMap;
var v1;
var v1 = numberMapToArray(numberMap); // Ok
var v1 = numberMapToArray(stringMap); // Ok
var v1 = stringMapToArray(numberMap); // Error expected here
var v1 = stringMapToArray(stringMap); // Ok
