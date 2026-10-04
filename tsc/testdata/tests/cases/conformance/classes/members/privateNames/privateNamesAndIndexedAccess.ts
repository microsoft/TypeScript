// @strict: true
// @target: es6
// @strictPropertyInitialization: false

class C {
    foo = 3;
    #bar = 3;
    constructor () {
        const ok: C["foo"] = 3;
        // not supported yet, could support in future:
        const badForNow: C[#bar] = 3;   // Error
        // will never use this syntax, already taken:
        const badAlways: C["#bar"] = 3; // Error
    }
}
