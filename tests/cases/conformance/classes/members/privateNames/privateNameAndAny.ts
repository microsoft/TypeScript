// @strict: true
// @target: es6

class A {
    #foo = true; 
    method(thing: any) {
        thing.#foo; // OK
        thing.#bar; // Error
        thing.#foo();
    }
    methodU(thing: unknown) {
        thing.#foo;
        thing.#bar;
        thing.#foo();
    }
    methodN(thing: never) {
        thing.#foo;
        thing.#bar;
        thing.#foo();
    }
};
