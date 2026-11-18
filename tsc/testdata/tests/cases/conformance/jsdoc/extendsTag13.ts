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

    /** @returns {typeof A} */
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

const ns = { A };

/**
 * @extends {A<string>}
 * @extends {Other<string>}
 */
class Direct extends A {}

/**
 * @extends {A<string>}
 * @extends {Other<string>}
 * @augments {Other<string>}
 */
class Call extends A.extend() {}

/** @extends {A<string>} */
/** @extends {Other<string>} */
/** @extends {A<string>} */
class SeparateDirect extends A {}

/** @extends {A<string>} */
/** @augments {Other<string>} */
class SeparateElement extends ns["A"] {}

/**
 * @extends {Other<string>}
 * @extends {A<string>}
 */
class FirstMismatch extends A.extend() {}

/**
 * @extends {A<string>}
 * @augments {A<string>}
 */
class CompatibleTags extends A.extend() {}
/** @type {string} */
const value = new CompatibleTags("ok").value;
