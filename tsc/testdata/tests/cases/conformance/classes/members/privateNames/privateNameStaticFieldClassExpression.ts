// @target: es2015

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


