//// [tests/cases/conformance/salsa/plainJSGrammarErrors4.ts] ////

//// [plainJSGrammarErrors4.js]
class A {
    #a;
    m() {
        this.#a; // ok
        this.#b; // error
    }
}


//// [plainJSGrammarErrors4.js]
class A {
    #a;
    m() {
        this.#a; // ok
        this.#b; // error
    }
}
