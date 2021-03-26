//// [privateNameFieldInitializer-static.ts]
class A {
    static #field = 10;
    static #uninitialized;
}


//// [privateNameFieldInitializer-static.js]
var _A_field, _A_uninitialized;
class A {
}
_A_field = { value: 10 };
_A_uninitialized = { value: void 0 };
