//// [tests/cases/conformance/classes/members/privateNames/privateNamesAndGenericClasses-2.ts] ////

//// [privateNamesAndGenericClasses-2.ts]
class C<T> {
    #foo: T;
    #bar(): T {
      return this.#foo;
    }
    constructor(t: T) {
      this.#foo = t;
      t = this.#bar();
    }
    set baz(t: T) {
      this.#foo = t;

    }
    get baz(): T {
      return this.#foo;
    }
}

let a = new C(3);
let b = new C("hello");

a.baz = 5                                 // OK
const x: number = a.baz                   // OK
a.#foo;                                   // Error
a = b;                                    // Error
b = a;                                    // Error


//// [privateNamesAndGenericClasses-2.js]
class C {
    #foo;
    #bar() {
        return this.#foo;
    }
    constructor(t) {
        this.#foo = t;
        t = this.#bar();
    }
    set baz(t) {
        this.#foo = t;
    }
    get baz() {
        return this.#foo;
    }
}
let a = new C(3);
let b = new C("hello");
a.baz = 5;
const x = a.baz;
a.#foo;
a = b;
b = a;
