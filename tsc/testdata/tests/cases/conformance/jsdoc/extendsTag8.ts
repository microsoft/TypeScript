// @target: es2015
// @allowJs: true
// @checkJs: true
// @noEmit: true

// @filename: a.js
/** @template T */
class A {
    /** @returns {typeof A} */
    static extend() {
        return this;
    }
}

/** @template T */
class C {}

/** @extends {C<string>} */
class B extends A.extend() {}
