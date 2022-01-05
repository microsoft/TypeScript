//// [privateNameStaticFieldInitializer.ts]
class A {
    static #field = 10;
    static #uninitialized;
}


//// [privateNameStaticFieldInitializer.js]
class A {
    static #field;
    static #uninitialized;
}
A.#field = 10;
