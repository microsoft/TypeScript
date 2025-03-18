//// [tests/cases/conformance/classes/members/privateNames/privateNamesConstructorChain-2.ts] ////

//// [privateNamesConstructorChain-2.ts]
class Parent<T> {
    #foo = 3;
    static #bar = 5;
    accessChildProps() {
        new Child<string>().#foo; // OK (`#foo` was added when `Parent`'s constructor was called on `child`)
        Child.#bar;       // Error: not found
    }
}

class Child<T> extends Parent<T> {
    #foo = "foo";       // OK (Child's #foo does not conflict, as `Parent`'s `#foo` is not accessible)
    #bar = "bar";       // OK
}

new Parent<number>().accessChildProps();


//// [privateNamesConstructorChain-2.js]
class Parent {
    #foo = 3;
    static #bar = 5;
    accessChildProps() {
        new Child().#foo;
        Child.#bar;
    }
}
class Child extends Parent {
    #foo = "foo";
    #bar = "bar";
}
new Parent().accessChildProps();
