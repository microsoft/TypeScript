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
}

/** @param {any} Base */
function mixin(Base) {
    return class extends Base {
        extra = 1;
    };
}

/** @extends {A<string>} */
class B extends mixin(A) {}

const value = new B().value;
const extra = new B().extra;
