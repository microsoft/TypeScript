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
var __classStaticPrivateFieldGet = (this && this.__classStaticPrivateFieldGet) || function (receiver, classConstructor, propertyDescriptor) {
    if (receiver !== classConstructor) {
        throw new TypeError("Private static access of wrong provenance");
    }
    return propertyDescriptor.value;
};
var _B_foo, _B_foo2, _a, _b;
class B {
    m() {
        console.log(__classStaticPrivateFieldGet(B, B, _B_foo).test);
        __classStaticPrivateFieldGet(B, B, _B_foo).test = 10;
        new (__classStaticPrivateFieldGet(B, B, _B_foo))().field;
    }
}
_B_foo = { value: (_a = class {
            constructor() {
                this.field = 10;
                console.log("hello");
                new (__classStaticPrivateFieldGet(B, B, _B_foo2))();
            }
        },
        _a.test = 123,
        _a) };
_B_foo2 = { value: (_b = class Foo {
        },
        _b.otherClass = 123,
        _b) };
