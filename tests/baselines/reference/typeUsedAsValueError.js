//// [tests/cases/compiler/typeUsedAsValueError.ts] ////

//// [typeUsedAsValueError.ts]
interface Interface {

}

class SomeClass {

}

type TypeAliasForSomeClass = SomeClass;
type someType = { x: number };

function acceptsSomeType(a: someType) {

}

let one = Interface;
let two = InterfaceNotFound;
let three = TypeAliasForSomeClass;
let four = new TypeAliasForSomeClass();
let five = new TypeAliasForSomeClassNotFound();
let six = someType;
acceptsSomeType(someType);
acceptsSomeType(someTypeNotFound);

//// [typeUsedAsValueError.js]
class SomeClass {
}
function acceptsSomeType(a) {
}
let one = Interface;
let two = InterfaceNotFound;
let three = TypeAliasForSomeClass;
let four = new TypeAliasForSomeClass();
let five = new TypeAliasForSomeClassNotFound();
let six = someType;
acceptsSomeType(someType);
acceptsSomeType(someTypeNotFound);
