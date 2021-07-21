// @allowJs: true
// @checkJs: true
// @target: esnext
// @declaration: true
// @outDir: out
// @Filename: jsdocAbstract2.js

/** @abstract */
class A {
    /**
     * @abstract
     * @returns {number}
     */
    foo() {}
}

// ok
class B extends A {
    foo() {
        return 1;
    }
}

// error
class C extends A {}

// ok
/** @abstract */
class D extends A {}
