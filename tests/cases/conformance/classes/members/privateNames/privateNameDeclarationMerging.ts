// @target: es6

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
