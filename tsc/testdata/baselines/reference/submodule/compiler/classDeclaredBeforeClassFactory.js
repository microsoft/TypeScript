//// [tests/cases/compiler/classDeclaredBeforeClassFactory.ts] ////

//// [classDeclaredBeforeClassFactory.ts]
// Should be OK due to hoisting
class Derived extends makeBaseClass() {}

function makeBaseClass() {
    return class Base {};
}


//// [classDeclaredBeforeClassFactory.js]
class Derived extends makeBaseClass() {
}
function makeBaseClass() {
    return class Base {
    };
}
