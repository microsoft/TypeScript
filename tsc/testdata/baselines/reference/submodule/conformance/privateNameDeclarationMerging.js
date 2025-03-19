//// [tests/cases/conformance/classes/members/privateNames/privateNameDeclarationMerging.ts] ////

//// [privateNameDeclarationMerging.ts]
class D {};

class C {
    #x;
    foo () {
        const c = new C();
        c.#x;     // OK
        const d: D = new C();
        d.#x;    // Error
    }
}
interface C {
    new (): D;
}


//// [privateNameDeclarationMerging.js]
class D {
}
;
class C {
    #x;
    foo() {
        const c = new C();
        c.#x; // OK
        const d = new C();
        d.#x; // Error
    }
}
