//// [tests/cases/conformance/types/typeRelationships/assignmentCompatibility/optionalPropertyAssignableToStringIndexSignature.ts] ////

//// [optionalPropertyAssignableToStringIndexSignature.ts]
declare let optionalProperties: { k1?: string };
declare let undefinedProperties: { k1: string | undefined };

declare let stringDictionary: { [key: string]: string };
stringDictionary = optionalProperties;  // ok
stringDictionary = undefinedProperties; // error

declare let probablyArray: { [key: number]: string };
declare let numberLiteralKeys: { 1?: string };
probablyArray = numberLiteralKeys;  // error

declare let optionalUndefined: { k1?: undefined };
let dict: { [key: string]: string } = optionalUndefined; // error

function f<T>() {
	let optional: { k1?: T } = undefined!;
	let dict: { [key: string]: T | number } = optional; // ok
}


//// [optionalPropertyAssignableToStringIndexSignature.js]
stringDictionary = optionalProperties; // ok
stringDictionary = undefinedProperties; // error
probablyArray = numberLiteralKeys; // error
let dict = optionalUndefined; // error
function f() {
    let optional = undefined;
    let dict = optional; // ok
}
