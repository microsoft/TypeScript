//// [privateNamesConstructorChain-2.ts]
class Parent<T> {
    #foo = 3;
    static #bar = 5;
    accessChildProps() {
        new Child<string>().#foo; // OK (`#foo` was added when `Parent`'s constructor was called on `child`)
        Child.#bar;       // Error: not found
    }
}

class Child<T> extends Parent<T> {
    #foo = "foo";       // OK (Child's #foo does not conflict, as `Parent`'s `#foo` is not accessible)
    #bar = "bar";       // OK
}

new Parent<number>().accessChildProps();


//// [privateNamesConstructorChain-2.js]
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var __classStaticPrivateFieldGet = (this && this.__classStaticPrivateFieldGet) || function (receiver, classConstructor, propertyDescriptor) {
    if (receiver !== classConstructor) {
        throw new TypeError("Private static access of wrong provenance");
    }
    return propertyDescriptor.value;
};
var _Parent_foo, _Parent_bar, _Child_foo, _Child_bar;
class Parent {
    constructor() {
        _Parent_foo.set(this, 3);
    }
    accessChildProps() {
        __classPrivateFieldGet(new Child(), _Parent_foo); // OK (`#foo` was added when `Parent`'s constructor was called on `child`)
        __classStaticPrivateFieldGet(Child, Parent, _Parent_bar); // Error: not found
    }
}
_Parent_foo = new WeakMap();
_Parent_bar = { value: 5 };
class Child extends Parent {
    constructor() {
        super(...arguments);
        _Child_foo.set(this, "foo"); // OK (Child's #foo does not conflict, as `Parent`'s `#foo` is not accessible)
        _Child_bar.set(this, "bar"); // OK
    }
}
_Child_foo = new WeakMap(), _Child_bar = new WeakMap();
new Parent().accessChildProps();
