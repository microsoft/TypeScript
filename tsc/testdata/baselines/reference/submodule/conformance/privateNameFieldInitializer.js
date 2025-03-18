//// [tests/cases/conformance/classes/members/privateNames/privateNameFieldInitializer.ts] ////

//// [privateNameFieldInitializer.ts]
class A {
    #field = 10;
    #uninitialized;
}


//// [privateNameFieldInitializer.js]
class A {
    #field = 10;
    #uninitialized;
}
