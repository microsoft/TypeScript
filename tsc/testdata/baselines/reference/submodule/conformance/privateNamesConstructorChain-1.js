//// [tests/cases/conformance/classes/members/privateNames/privateNamesConstructorChain-1.ts] ////

//// [privateNamesConstructorChain-1.ts]
class Parent {
    #foo = 3;
    static #bar = 5;
    accessChildProps() {
        new Child().#foo; // OK (`#foo` was added when `Parent`'s constructor was called on `child`)
        Child.#bar;       // Error: not found
    }
}

class Child extends Parent {
    #foo = "foo";       // OK (Child's #foo does not conflict, as `Parent`'s `#foo` is not accessible)
    #bar = "bar";       // OK
}


//// [privateNamesConstructorChain-1.js]
class Parent {
    #foo = 3;
    static #bar = 5;
    accessChildProps() {
        new Child().#foo; // OK (`#foo` was added when `Parent`'s constructor was called on `child`)
        Child.#bar; // Error: not found
    }
}
class Child extends Parent {
    #foo = "foo"; // OK (Child's #foo does not conflict, as `Parent`'s `#foo` is not accessible)
    #bar = "bar"; // OK
}
