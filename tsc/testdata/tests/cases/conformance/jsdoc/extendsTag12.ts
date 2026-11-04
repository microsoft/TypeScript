// @target: esnext
// @allowJs: true
// @checkJs: true
// @strict: true
// @noEmit: true

// @filename: a.js
/** @template T */
class A {
    /** @param {T} value */
    constructor(value) {
        this.value = value;
    }
}

/**
 * @template T
 * @extends {A<T>}
 */
class Sub extends A {
    /** @returns {typeof Sub} */
    static extend() {
        return this;
    }
}

/** @template T */
class Other {
    /** @param {T} other */
    constructor(other) {
        this.other = other;
    }
}

/**
 * @template {new (...args: any[]) => any} C
 * @param {C} Base
 */
function mixin(Base) {
    return class extends Base {
        extra = 1;
    };
}

const ns = { A };
/** @type {boolean} */
let cond = true;

/** @extends {A<string>} */
class ViaMixin extends mixin(A) {}
/** @type {string} */
const viaMixin = new ViaMixin("ok").value;
/** @type {number} */
const viaMixinExtra = new ViaMixin("ok").extra;

/** @extends {Other<string>} */
class MismatchedMixin extends mixin(A) {}

/** @extends {A<string>} */
class ViaSubclass extends Sub.extend() {}
/** @type {string} */
const viaSubclass = new ViaSubclass("ok").value;

/** @extends {A<string>} */
class ViaElementAccess extends ns["A"] {}
/** @type {string} */
const viaElementAccess = new ViaElementAccess("ok").value;

/** @extends {A<string>} */
class ViaConditional extends (cond ? A : A) {}
/** @type {string} */
const viaConditional = new ViaConditional("ok").value;
