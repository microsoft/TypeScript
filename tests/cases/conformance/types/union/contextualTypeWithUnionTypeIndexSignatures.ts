//When used as a contextual type, a union type U has those members that are present in any of 
// its constituent types, with types that are unions of the respective members in the constituent types. 
interface SomeType {
    (a: number): number;
}
interface SomeType2 {
    (a: number): string;
}

interface IWithNoStringIndexSignature {
    foo: string;
}
interface IWithNoNumberIndexSignature {
    0: string;
}
interface IWithStringIndexSignature1 {
    [a: string]: SomeType;
}
interface IWithStringIndexSignature2 {
    [a: string]: SomeType2;
}
interface IWithNumberIndexSignature1 {
    [a: number]: SomeType;
}
interface IWithNumberIndexSignature2 {
    [a: number]: SomeType2;
}

// When an object literal is contextually typed by a type that includes a string index signature, 
// the resulting type of the object literal includes a string index signature with the union type of 
// the types of the properties declared in the object literal, or the Undefined type if the object literal 
// is empty.Likewise, when an object literal is contextually typed by a type that includes a numeric index 
// signature, the resulting type of the object literal includes a numeric index signature with the union type
// of the types of the numerically named properties(section 3.7.4) declared in the object literal, 
// or the Undefined type if the object literal declares no numerically named properties.

// Let S be the set of types in U that has a string index signature.
// If S is not empty, U has a string index signature of a union type of 
// the types of the string index signatures from each type in S.
var x: IWithNoStringIndexSignature | IWithStringIndexSignature1 = { z: a => a }; // a should be number
var x: IWithNoStringIndexSignature | IWithStringIndexSignature1 = { foo: a => a }; // a should be number (because of index signature of IWithStringIndexSignature1)
var x: IWithNoStringIndexSignature | IWithStringIndexSignature1 = { foo: "hello" }; 
var x2: IWithStringIndexSignature1 | IWithStringIndexSignature2 = { z: a => a.toString() }; // a should be number
var x2: IWithStringIndexSignature1 | IWithStringIndexSignature2 = { z: a => a }; // a should be number


// Let S be the set of types in U that has a numeric index signature.
// If S is not empty, U has a numeric index signature of a union type of 
// the types of the numeric index signatures from each type in S.
var x3: IWithNoNumberIndexSignature | IWithNumberIndexSignature1 = { 1: a => a }; // a should be number
var x3: IWithNoNumberIndexSignature | IWithNumberIndexSignature1 = { 0: a => a }; // a should be number (because of index signature of IWithNumberIndexSignature1)
var x3: IWithNoNumberIndexSignature | IWithNumberIndexSignature1 = { 0: "hello" };
var x4: IWithNumberIndexSignature1 | IWithNumberIndexSignature2 = { 1: a => a.toString() }; // a should be number
var x4: IWithNumberIndexSignature1 | IWithNumberIndexSignature2 = { 1: a => a }; // a should be number