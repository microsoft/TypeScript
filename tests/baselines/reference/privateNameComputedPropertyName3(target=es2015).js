//// [privateNameComputedPropertyName3.ts]
class Foo {
    #name;

    constructor(name) {
        this.#name = name;
    }

    getValue(x) {
        const obj = this;

        class Bar {
            #y = 100;

            [obj.#name]() {
                return x + this.#y;
            }
        }

        return new Bar()[obj.#name]();
    }
}

console.log(new Foo("NAME").getValue(100));


//// [privateNameComputedPropertyName3.js]
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _name;
class Foo {
    constructor(name) {
        _name.set(this, void 0);
        __classPrivateFieldSet(this, _name, name);
    }
    getValue(x) {
        var _y;
        const obj = this;
        class Bar {
            constructor() {
                _y.set(this, 100);
            }
            [(_y = new WeakMap(), __classPrivateFieldGet(obj, _name))]() {
                return x + __classPrivateFieldGet(this, _y);
            }
        }
        return new Bar()[__classPrivateFieldGet(obj, _name)]();
    }
}
_name = new WeakMap();
console.log(new Foo("NAME").getValue(100));
