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
var SomeClass = /** @class */ (function () {
    function SomeClass() {
    }
    return SomeClass;
}());
function acceptsSomeType(a) {
}
var one = Interface;
var two = InterfaceNotFound;
var three = TypeAliasForSomeClass;
var four = new TypeAliasForSomeClass();
var five = new TypeAliasForSomeClassNotFound();
var six = someType;
acceptsSomeType(someType);
acceptsSomeType(someTypeNotFound);
