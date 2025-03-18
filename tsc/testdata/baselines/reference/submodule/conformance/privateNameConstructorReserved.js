//// [tests/cases/conformance/classes/members/privateNames/privateNameConstructorReserved.ts] ////

//// [privateNameConstructorReserved.ts]
class A {
    #constructor() {}      // Error: `#constructor` is a reserved word.
}


//// [privateNameConstructorReserved.js]
class A {
    #constructor() { }
}
