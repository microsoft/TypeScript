//// [tests/cases/conformance/classes/members/privateNames/privateNameAndAny.ts] ////

//// [privateNameAndAny.ts]
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


//// [privateNameAndAny.js]
class A {
    #foo = true;
    static #baz = 10;
    static #m() { }
    method(thing) {
        thing.#foo;
        thing.#m();
        thing.#baz;
        thing.#bar;
        thing.#foo();
    }
    methodU(thing) {
        thing.#foo;
        thing.#m();
        thing.#baz;
        thing.#bar;
        thing.#foo();
    }
    methodN(thing) {
        thing.#foo;
        thing.#m();
        thing.#baz;
        thing.#bar;
        thing.#foo();
    }
}
;
