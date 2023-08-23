// @allowJs: true
// @declaration: true
// @emitDeclarationOnly: true
// @strict: false
// @strictNullChecks: true
// @filename: test/Test.js
/** @module test/Test */
class Test {}
export default Test;
// @filename: Test.js
/** @module Test */
class Test {}
export default Test;
// @filename: index.js
import Test from './test/Test.js'

/**
 * @typedef {Object} Options
 * @property {typeof import("./Test.js").default} [test]
 */

class X extends Test {
    /**
     * @param {Options} options
     */
    constructor(options) {
        super();
        if (options.test) {
            this.test = new options.test();
        }
    }
}

export default X;
