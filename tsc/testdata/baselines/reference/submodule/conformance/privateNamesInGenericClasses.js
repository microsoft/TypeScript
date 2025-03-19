//// [tests/cases/conformance/classes/members/privateNames/privateNamesInGenericClasses.ts] ////

//// [privateNamesInGenericClasses.ts]
class C<T> {
    #foo: T;
    #method(): T { return this.#foo; }
    get #prop(): T { return this.#foo; }
    set #prop(value : T) { this.#foo = value; }
    
    bar(x: C<T>) { return x.#foo; }          // OK
    bar2(x: C<T>) { return x.#method(); }    // OK
    bar3(x: C<T>) { return x.#prop; }        // OK

    baz(x: C<number>) { return x.#foo; }     // OK
    baz2(x: C<number>) { return x.#method; } // OK
    baz3(x: C<number>) { return x.#prop; }   // OK

    quux(x: C<string>) { return x.#foo; }    // OK
    quux2(x: C<string>) { return x.#method; }// OK
    quux3(x: C<string>) { return x.#prop; }  // OK
}

declare let a: C<number>;
declare let b: C<string>;
a.#foo;                                   // Error
a.#method;                                // Error
a.#prop;                                  // Error
a = b;                                    // Error
b = a;                                    // Error


//// [privateNamesInGenericClasses.js]
class C {
    #foo;
    #method() { return this.#foo; }
    get #prop() { return this.#foo; }
    set #prop(value) { this.#foo = value; }
    bar(x) { return x.#foo; } // OK
    bar2(x) { return x.#method(); } // OK
    bar3(x) { return x.#prop; } // OK
    baz(x) { return x.#foo; } // OK
    baz2(x) { return x.#method; } // OK
    baz3(x) { return x.#prop; } // OK
    quux(x) { return x.#foo; } // OK
    quux2(x) { return x.#method; } // OK
    quux3(x) { return x.#prop; } // OK
}
a.#foo; // Error
a.#method; // Error
a.#prop; // Error
a = b; // Error
b = a; // Error
