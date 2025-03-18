//// [tests/cases/conformance/classes/members/privateNames/privateNameFieldParenthesisLeftAssignment.ts] ////

//// [privateNameFieldParenthesisLeftAssignment.ts]
class Foo {
    #p: number;

    constructor(value: number) {
        this.#p = value;
    }

    t1(p: number) {
        (this.#p as number) = p;
    }

    t2(p: number) {
        (((this.#p as number))) = p;
    }

    t3(p: number) {
        (this.#p) = p;
    }

    t4(p: number) {
        (((this.#p))) = p;
    }
}


//// [privateNameFieldParenthesisLeftAssignment.js]
class Foo {
    #p;
    constructor(value) {
        this.#p = value;
    }
    t1(p) {
        this.#p = p;
    }
    t2(p) {
        this.#p = p;
    }
    t3(p) {
        (this.#p) = p;
    }
    t4(p) {
        (((this.#p))) = p;
    }
}
