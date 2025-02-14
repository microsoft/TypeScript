// @allowJs: true
// @checkJs: true
// @target: esnext
// @outDir: out
// @Filename: foo.js

/**
 * @constructor
 */
class A {
    constructor() {}
}

/**
 * @extends {A}
 * @constructor
 */
class B extends A {
    constructor() {
        super();
    }
}

/**
 * @extends { A }
 * @constructor
 */
class C extends A {
    constructor() {
        super();
    }
}
