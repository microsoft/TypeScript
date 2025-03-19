//// [tests/cases/conformance/classes/members/privateNames/privateNameCircularReference.ts] ////

//// [privateNameCircularReference.ts]
class A {
    #foo = this.#bar;
    #bar = this.#foo;
    ["#baz"] = this["#baz"]; // Error (should *not* be private name error)
}


//// [privateNameCircularReference.js]
class A {
    #foo = this.#bar;
    #bar = this.#foo;
    ["#baz"] = this["#baz"]; // Error (should *not* be private name error)
}
