// @allowJs: true
// @checkJs: true
// @target: esnext
// @noEmit: true
// @Filename: foo.js

/**
 * @constructor
 */
class A {
    constructor() {}
}

/**
 * @extends { A }
 * @constructor
 */
class B extends A {
    constructor() {
        super();
    }
}
