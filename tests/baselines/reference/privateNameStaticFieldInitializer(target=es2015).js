//// [privateNameStaticFieldInitializer.ts]
class A {
    static #field = 10;
    static #uninitialized;
}


//// [privateNameStaticFieldInitializer.js]
var _a, _A_field, _A_uninitialized;
class A {
}
_a = A;
_A_field = { value: 10 };
_A_uninitialized = { value: void 0 };
