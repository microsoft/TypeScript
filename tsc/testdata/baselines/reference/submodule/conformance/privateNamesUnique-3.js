//// [tests/cases/conformance/classes/members/privateNames/privateNamesUnique-3.ts] ////

//// [privateNamesUnique-3.ts]
class A {
    #foo = 1;
    static #foo = true; // error (duplicate)
                        // because static and instance private names
                        // share the same lexical scope
                        // https://tc39.es/proposal-class-fields/#prod-ClassBody
}
class B {
    static #foo = true;
    test(x: B) {
        x.#foo; // error (#foo is a static property on B, not an instance property)
    }
}


//// [privateNamesUnique-3.js]
class A {
    #foo = 1;
    static #foo = true;
}
class B {
    static #foo = true;
    test(x) {
        x.#foo;
    }
}
