//// [tests/cases/conformance/classes/members/privateNames/privateNameStaticsAndStaticMethods.ts] ////

//// [privateNameStaticsAndStaticMethods.ts]
class A {
    static #foo(a: number) {}
    static async #bar(a: number) {}
    static async *#baz(a: number) {
        return 3;
    }
    static #_quux: number;
    static get #quux (): number {
        return this.#_quux;
    }
    static set #quux (val: number) {
        this.#_quux = val;
    }
    constructor () {
        A.#foo(30);
        A.#bar(30);
        A.#bar(30);
        A.#quux = A.#quux + 1;
        A.#quux++;
 }
}

class B extends A {
    static #foo(a: string) {}
    constructor () {
        super();
        B.#foo("str");
    }
}


//// [privateNameStaticsAndStaticMethods.js]
"use strict";
class A {
    static #foo(a) { }
    static async #bar(a) { }
    static async *#baz(a) {
        return 3;
    }
    static #_quux;
    static get #quux() {
        return this.#_quux;
    }
    static set #quux(val) {
        this.#_quux = val;
    }
    constructor() {
        A.#foo(30);
        A.#bar(30);
        A.#bar(30);
        A.#quux = A.#quux + 1;
        A.#quux++;
    }
}
class B extends A {
    static #foo(a) { }
    constructor() {
        super();
        B.#foo("str");
    }
}
