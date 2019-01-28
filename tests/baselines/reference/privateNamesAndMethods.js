//// [privateNamesAndMethods.ts]
class A {
    #foo(a: number) {}
    async #bar(a: number) {}
    async *#baz(a: number) {
        return 3;
    }
    #_quux: number;
    get #quux (): number {
        return this.#_quux;
    }
    set #quux (val: number) {
        this.#_quux = val; 
    }
    constructor () {
        this.#foo(30);
        this.#bar(30);
        this.#bar(30);
        this.#quux = this.#quux + 1;
        this.#quux++;
 }
}

class B extends A {
    #foo(a: string) {}
    constructor () {
        super();
        this.#foo("str");
    }
}


tests/cases/conformance/classes/members/privateNames/privateNamesAndMethods.js(3,14): error TS1003: Identifier expected.
tests/cases/conformance/classes/members/privateNames/privateNamesAndMethods.js(4,14): error TS1003: Identifier expected.
tests/cases/conformance/classes/members/privateNames/privateNamesAndMethods.js(5,14): error TS1003: Identifier expected.
tests/cases/conformance/classes/members/privateNames/privateNamesAndMethods.js(6,15): error TS1003: Identifier expected.
tests/cases/conformance/classes/members/privateNames/privateNamesAndMethods.js(6,23): error TS1003: Identifier expected.
tests/cases/conformance/classes/members/privateNames/privateNamesAndMethods.js(7,14): error TS1003: Identifier expected.
tests/cases/conformance/classes/members/privateNames/privateNamesAndMethods.js(9,5): error TS1068: Unexpected token. A constructor, method, accessor, or property was expected.
tests/cases/conformance/classes/members/privateNames/privateNamesAndMethods.js(9,9): error TS1005: '=>' expected.
tests/cases/conformance/classes/members/privateNames/privateNamesAndMethods.js(10,15): error TS1005: '=>' expected.
tests/cases/conformance/classes/members/privateNames/privateNamesAndMethods.js(11,16): error TS1005: ';' expected.
tests/cases/conformance/classes/members/privateNames/privateNamesAndMethods.js(14,12): error TS1005: ';' expected.
tests/cases/conformance/classes/members/privateNames/privateNamesAndMethods.js(15,21): error TS1003: Identifier expected.
tests/cases/conformance/classes/members/privateNames/privateNamesAndMethods.js(17,15): error TS1005: ';' expected.
tests/cases/conformance/classes/members/privateNames/privateNamesAndMethods.js(18,15): error TS1003: Identifier expected.
tests/cases/conformance/classes/members/privateNames/privateNamesAndMethods.js(20,1): error TS1128: Declaration or statement expected.
tests/cases/conformance/classes/members/privateNames/privateNamesAndMethods.js(22,5): error TS1068: Unexpected token. A constructor, method, accessor, or property was expected.
tests/cases/conformance/classes/members/privateNames/privateNamesAndMethods.js(22,9): error TS1005: '=>' expected.
tests/cases/conformance/classes/members/privateNames/privateNamesAndMethods.js(23,19): error TS1005: ';' expected.
tests/cases/conformance/classes/members/privateNames/privateNamesAndMethods.js(25,14): error TS1003: Identifier expected.
tests/cases/conformance/classes/members/privateNames/privateNamesAndMethods.js(27,1): error TS1128: Declaration or statement expected.


==== tests/cases/conformance/classes/members/privateNames/privateNamesAndMethods.js (20 errors) ====
    class A {
        constructor() {
            this.(30);
                 ~
!!! error TS1003: Identifier expected.
            this.(30);
                 ~
!!! error TS1003: Identifier expected.
            this.(30);
                 ~
!!! error TS1003: Identifier expected.
            this. = this. + 1;
                  ~
!!! error TS1003: Identifier expected.
                          ~
!!! error TS1003: Identifier expected.
            this.++;
                 ~~
!!! error TS1003: Identifier expected.
        }
        (a) { }
        ~
!!! error TS1068: Unexpected token. A constructor, method, accessor, or property was expected.
            ~
!!! error TS1005: '=>' expected.
        async (a) { }
                  ~
!!! error TS1005: '=>' expected.
        async *(a) {
                   ~
!!! error TS1005: ';' expected.
            return 3;
        }
        get () {
               ~
!!! error TS1005: ';' expected.
            return this.;
                        ~
!!! error TS1003: Identifier expected.
        }
        set (val) {
                  ~
!!! error TS1005: ';' expected.
            this. = val;
                  ~
!!! error TS1003: Identifier expected.
        }
    }
    ~
!!! error TS1128: Declaration or statement expected.
    class B extends A {
        (a) { }
        ~
!!! error TS1068: Unexpected token. A constructor, method, accessor, or property was expected.
            ~
!!! error TS1005: '=>' expected.
        constructor() {
                      ~
!!! error TS1005: ';' expected.
            super();
            this.("str");
                 ~
!!! error TS1003: Identifier expected.
        }
    }
    ~
!!! error TS1128: Declaration or statement expected.
    