// @strict: true
// @target: es6

class A {
    #foo = true;
    static #baz = 10;
    static #m() {}
    method(thing: any) {
        thing.#foo; // OK
        thing.#m();
        thing.#baz;
        thing.#bar; // Error
        thing.#foo();
    }
    methodU(thing: unknown) {
        thing.#foo;
        thing.#m();
        thing.#baz;
        thing.#bar;
        thing.#foo();
    }
    methodN(thing: never) {
        thing.#foo;
        thing.#m();
        thing.#baz;
        thing.#bar;
        thing.#foo();
    }
};
