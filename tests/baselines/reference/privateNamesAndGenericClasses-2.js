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
"use strict";
class C {
    constructor(t) {
        this. = t;
        t = this.();
    }
    () {
        return this.;
    }
    set baz(t) {
        this. = t;
    }
    get baz() {
        return this.;
    }
}
let a = new C(3);
let b = new C("hello");
a.baz = 5; // OK
const x = a.baz; // OK
a.; // Error
a = b; // Error
b = a; // Error
