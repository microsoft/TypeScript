// @target: es2015
// @allowJs: true
// @checkJs: true
// @noEmit: true

// @filename: a.js
/** @template T */
class A {
    /** @param {T} value */
    constructor(value) {
        this.value = value;
    }

    /** @returns {typeof A} */
    static extend() {
        return this;
    }
}

/** @extends {A<string>} */
class B extends A.extend() {}

new B("ok");
new B(1);

/** @extends {A<string>} */
class C extends A.extend() {
    constructor() {
        super(1);
    }
}

/**
 * @param {number} required
 * @returns {typeof A}
 */
function getA(required) {
    return A;
}

/** @extends {A<string>} */
class D extends getA("wrong") {}
