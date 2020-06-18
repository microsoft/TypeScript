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
