//// [privateNamesAndStaticMethods.ts]
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


tests/cases/conformance/classes/members/privateNames/privateNamesAndStaticMethods.js(4,11): error TS1003: Identifier expected.
tests/cases/conformance/classes/members/privateNames/privateNamesAndStaticMethods.js(5,11): error TS1003: Identifier expected.
tests/cases/conformance/classes/members/privateNames/privateNamesAndStaticMethods.js(6,11): error TS1003: Identifier expected.
tests/cases/conformance/classes/members/privateNames/privateNamesAndStaticMethods.js(7,12): error TS1003: Identifier expected.
tests/cases/conformance/classes/members/privateNames/privateNamesAndStaticMethods.js(7,17): error TS1003: Identifier expected.
tests/cases/conformance/classes/members/privateNames/privateNamesAndStaticMethods.js(8,11): error TS1003: Identifier expected.
tests/cases/conformance/classes/members/privateNames/privateNamesAndStaticMethods.js(12,19): error TS1003: Identifier expected.
tests/cases/conformance/classes/members/privateNames/privateNamesAndStaticMethods.js(16,21): error TS1003: Identifier expected.
tests/cases/conformance/classes/members/privateNames/privateNamesAndStaticMethods.js(19,15): error TS1003: Identifier expected.
tests/cases/conformance/classes/members/privateNames/privateNamesAndStaticMethods.js(26,11): error TS1003: Identifier expected.


==== tests/cases/conformance/classes/members/privateNames/privateNamesAndStaticMethods.js (10 errors) ====
    "use strict";
    class A {
        constructor() {
            A.(30);
              ~
!!! error TS1003: Identifier expected.
            A.(30);
              ~
!!! error TS1003: Identifier expected.
            A.(30);
              ~
!!! error TS1003: Identifier expected.
            A. = A. + 1;
               ~
!!! error TS1003: Identifier expected.
                    ~
!!! error TS1003: Identifier expected.
            A.++;
              ~~
!!! error TS1003: Identifier expected.
        }
        static (a) { }
        static async (a) { }
        static async *(a) {
                      ~
!!! error TS1003: Identifier expected.
            return 3;
        }
        static get () {
            return this.;
                        ~
!!! error TS1003: Identifier expected.
        }
        static set (val) {
            this. = val;
                  ~
!!! error TS1003: Identifier expected.
        }
    }
    class B extends A {
        static (a) { }
        constructor() {
            super();
            B.("str");
              ~
!!! error TS1003: Identifier expected.
        }
    }
    