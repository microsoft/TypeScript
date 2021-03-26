//// [privateNameStaticFieldClassExpression.ts]
class B {
    static #foo = class {
        constructor() {
            console.log("hello");
            new B.#foo2();
        }
        static test = 123;
        field = 10;
    };
    static #foo2 = class Foo {
        static otherClass = 123;
    };

    m() {
        console.log(B.#foo.test)
        B.#foo.test = 10;
        new B.#foo().field;
    }
}




//// [privateNameStaticFieldClassExpression.js]
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _a, _B_foo, _B_foo2, _b, _c;
class B {
    m() {
        console.log(__classPrivateFieldGet(B, _a, "f", _B_foo).test);
        __classPrivateFieldGet(B, _a, "f", _B_foo).test = 10;
        new (__classPrivateFieldGet(B, _a, "f", _B_foo))().field;
    }
}
_a = B;
_B_foo = { value: (_b = class {
            constructor() {
                this.field = 10;
                console.log("hello");
                new (__classPrivateFieldGet(B, _a, "f", _B_foo2))();
            }
        },
        _b.test = 123,
        _b) };
_B_foo2 = { value: (_c = class Foo {
        },
        _c.otherClass = 123,
        _c) };
