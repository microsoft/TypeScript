//// [tests/cases/conformance/classes/members/privateNames/typeFromPrivatePropertyAssignment.ts] ////

//// [typeFromPrivatePropertyAssignment.ts]
type Foo = { foo?: string };

class C {
    #a?: Foo;
    #b?: Foo;

    m() {
        const a = this.#a || {};
        this.#b = this.#b || {};
    }
}


//// [typeFromPrivatePropertyAssignment.js]
class C {
    #a;
    #b;
    m() {
        const a = this.#a || {};
        this.#b = this.#b || {};
    }
}
