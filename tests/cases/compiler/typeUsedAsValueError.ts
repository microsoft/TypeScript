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