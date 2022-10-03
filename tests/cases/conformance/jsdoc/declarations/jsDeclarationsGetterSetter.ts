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
