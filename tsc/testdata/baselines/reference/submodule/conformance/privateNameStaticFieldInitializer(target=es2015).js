//// [tests/cases/conformance/classes/members/privateNames/privateNameStaticFieldInitializer.ts] ////

//// [privateNameStaticFieldInitializer.ts]
class A {
    static #field = 10;
    static #uninitialized;
}


//// [privateNameStaticFieldInitializer.js]
class A {
    static #field = 10;
    static #uninitialized;
}
