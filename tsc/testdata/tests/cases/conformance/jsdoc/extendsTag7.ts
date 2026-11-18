// @target: es2015
// @allowJs: true
// @checkJs: true
// @declaration: true
// @outDir: out

// @filename: a.js
/** @template T */
class A {
    /** @returns {T} */
    get value() {
        throw new Error();
    }

    /** @returns {typeof A} */
    static extend() {
        return this;
    }
}

/** @extends {A<string>} */
class B extends A.extend() {}

const value = new B().value;
