//// [privateNameFieldInitializer.ts]
class A {
    #field = 10;
    #uninitialized;
}


//// [privateNameFieldInitializer.js]
var _field, _uninitialized;
class A {
    constructor() {
        _field.set(this, 10);
        _uninitialized.set(this, void 0);
    }
}
_field = new WeakMap(), _uninitialized = new WeakMap();
