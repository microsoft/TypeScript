// @strict: true
// @target: es6

class A {
    #foo = true; 
    method(thing: any) {
        thing.#foo; // OK
        thing.#bar; // Error
    }
};
