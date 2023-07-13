//// [tests/cases/conformance/classes/members/privateNames/privateNameAmbientNoImplicitAny.ts] ////

//// [privateNameAmbientNoImplicitAny.ts]
declare class A {
    #prop;
}
class B {
    #prop;
}

//// [privateNameAmbientNoImplicitAny.js]
class B {
    #prop;
}
