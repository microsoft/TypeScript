// @strict: true
// @target: es6

class A {
    #foo = true;
    static #baz = 10;
    static #m() {}
    method(thing: any) {
        thing.#foo; // OK
        thing.#m();
        thing.#bar;
        thing.#bar; // Error
    }
};
