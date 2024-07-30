// @allowJs: true
// @checkJs: true
// @outDir: ./out
// @target: es6
// @declaration: true
// @filename: index.js
export class A {
    get x() {
        return 12;
    }
}

export class B {
    /**
     * @param {number} _arg
     */
    set x(_arg) {
    }
}

export class C {
    get x() {
        return 12;
    }
    set x(_arg) {
    }
}

export class D {}
Object.defineProperty(D.prototype, "x", {
    get() {
        return 12;
    }
});

export class E {}
Object.defineProperty(E.prototype, "x", {
    /**
     * @param {number} _arg
     */
    set(_arg) {}
});

export class F {}
Object.defineProperty(F.prototype, "x", {
    get() {
        return 12;
    },
    /**
     * @param {number} _arg
     */
    set(_arg) {}
});

export class G {}
Object.defineProperty(G.prototype, "x", {
    /**
     * @param {number[]} args
     */
    set(...args) {}
});

export class H {}
Object.defineProperty(H.prototype, "x", {
    set() {}
});


export class I {}
Object.defineProperty(I.prototype, "x", {
    /**
     * @param {number} v
     */
    set: (v) => {}
});

/**
 * @param {number} v
 */
const jSetter = (v) => {}
export class J {}
Object.defineProperty(J.prototype, "x", {
    set: jSetter
});

/**
 * @param {number} v
 */
const kSetter1 = (v) => {}
/**
 * @param {number} v
 */
const kSetter2 = (v) => {}
export class K {}
Object.defineProperty(K.prototype, "x", {
    set: Math.random() ? kSetter1 : kSetter2
});

/**
 * @param {number} v
 */
const lSetter1 = (v) => {}
/**
 * @param {string} v
 */
const lSetter2 = (v) => {}
export class L {}
Object.defineProperty(L.prototype, "x", {
    set: Math.random() ? lSetter1 : lSetter2
});

/**
 * @param {number | boolean} v
 */
const mSetter1 = (v) => {}
/**
 * @param {string | boolean} v
 */
const mSetter2 = (v) => {}
export class M {}
Object.defineProperty(M.prototype, "x", {
    set: Math.random() ? mSetter1 : mSetter2
});
