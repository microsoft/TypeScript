//// [tests/cases/conformance/classes/members/privateNames/privateNameAndIndexSignature.ts] ////

//// [privateNameAndIndexSignature.ts]
class A {
    [k: string]: any;
    #foo = 3;
    ["#bar"] = this["#bar"]   // Error (private identifiers should not prevent circularity checking for computeds)
    constructor(message: string) {
        this.#f = 3           // Error (index signatures do not implicitly declare private names)
        this["#foo"] = 3;     // Okay (type has index signature and "#foo" does not collide with private identifier #foo)

    }
}


//// [privateNameAndIndexSignature.js]
class A {
    #foo = 3;
    ["#bar"] = this["#bar"]; // Error (private identifiers should not prevent circularity checking for computeds)
    constructor(message) {
        this.#f = 3; // Error (index signatures do not implicitly declare private names)
        this["#foo"] = 3; // Okay (type has index signature and "#foo" does not collide with private identifier #foo)
    }
}
