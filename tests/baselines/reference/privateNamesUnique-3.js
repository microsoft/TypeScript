//// [privateNamesUnique-3.ts]
class A {
    #foo = 1;
    static #foo = true; // error (duplicate)
                        // because static and instance private names
                        // share the same lexical scope
                        // https://tc39.es/proposal-class-fields/#prod-ClassBody
}
class B {
    static #foo = true;
    test(x: B) {
        x.#foo; // error (#foo is a static property on B, not an instance property)
    }
}


//// [privateNamesUnique-3.js]
var __classStaticPrivateFieldGet = (this && this.__classStaticPrivateFieldGet) || function (receiver, classConstructor, propertyDescriptor) {
    if (receiver !== classConstructor) {
        throw new TypeError("Private static access of wrong provenance");
    }
    if (propertyDescriptor === undefined) {
        throw new TypeError("Private static field was accessed before its declaration.");
    }
    return propertyDescriptor.value;
};
var _A_foo, _A_foo_1, _B_foo;
class A {
    constructor() {
        _A_foo_1 = { value: 1 };
        // because static and instance private names
        // share the same lexical scope
        // https://tc39.es/proposal-class-fields/#prod-ClassBody
    }
}
_A_foo = new WeakMap();
_A_foo_1 = { value: true }; // error (duplicate)
class B {
    test(x) {
        __classStaticPrivateFieldGet(x, B, _B_foo); // error (#foo is a static property on B, not an instance property)
    }
}
_B_foo = { value: true };
