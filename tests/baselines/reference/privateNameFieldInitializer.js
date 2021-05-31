//// [privateNameFieldInitializer.ts]
class A {
    #field = 10;
    #uninitialized;
}


//// [privateNameFieldInitializer.js]
var _A_field, _A_uninitialized;
class A {
    constructor() {
        _A_field.set(this, 10);
        _A_uninitialized.set(this, void 0);
    }
}
_A_field = new WeakMap(), _A_uninitialized = new WeakMap();
