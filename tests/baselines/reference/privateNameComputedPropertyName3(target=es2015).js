//// [tests/cases/conformance/classes/members/privateNames/privateNameComputedPropertyName3.ts] ////

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
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Foo_name;
class Foo {
    constructor(name) {
        _Foo_name.set(this, void 0);
        __classPrivateFieldSet(this, _Foo_name, name, "f");
    }
    getValue(x) {
        var _Bar_y;
        const obj = this;
        class Bar {
            constructor() {
                _Bar_y.set(this, 100);
            }
            [(_Bar_y = new WeakMap(), __classPrivateFieldGet(obj, _Foo_name, "f"))]() {
                return x + __classPrivateFieldGet(this, _Bar_y, "f");
            }
        }
        return new Bar()[__classPrivateFieldGet(obj, _Foo_name, "f")]();
    }
}
_Foo_name = new WeakMap();
console.log(new Foo("NAME").getValue(100));
