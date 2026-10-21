// @strict: true
// @target: es2015

class ConstructorGuard {
    constructor() {
        if (new.target === undefined) throw TypeError("Constructor requires new");
    }
}
