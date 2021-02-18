//// [privateNameStaticFieldInitializer.ts]
class A {
    static #field = 10;
    static #uninitialized;
}


//// [privateNameStaticFieldInitializer.js]
var _A_field, _A_uninitialized;
class A {
}
_A_uninitialized = { value: void 0 };
_A_field = { value: 10 };
