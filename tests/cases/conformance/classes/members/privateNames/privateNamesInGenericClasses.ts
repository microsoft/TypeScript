// @strict: true
// @target: es6
// @strictPropertyInitialization: false

class C<T> {
    #foo: T;
    bar(x: C<T>) { return x.#foo; }          // OK
    baz(x: C<number>) { return x.#foo; }     // OK
    quux(x: C<string>) { return x.#foo; }    // OK
}

declare let a: C<number>;
declare let b: C<string>;
a.#foo;                                   // Error
a = b;                                    // Error
b = a;                                    // Error
