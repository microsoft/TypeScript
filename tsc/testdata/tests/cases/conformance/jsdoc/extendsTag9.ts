// @target: es2015
// @allowJs: true
// @checkJs: true
// @noEmit: true

// @filename: a.js
/** @template T */
class A {
    /** @returns {T} */
    get a() {
        throw new Error();
    }

    /** @returns {typeof C} */
    static extend() {
        return C;
    }
}

/** @template T */
class C {
    /** @returns {T} */
    get c() {
        throw new Error();
    }
}

/** @extends {A<string>} */
class B extends A.extend() {}

const a = new B().a;
const c = new B().c;
