//// [tests/cases/compiler/jsDeclarationEmitDoesNotRenameImport.ts] ////

//// [Test.js]
/** @module test/Test */
class Test {}
export default Test;
//// [Test.js]
/** @module Test */
class Test {}
export default Test;
//// [index.js]
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




//// [Test.d.ts]
/** @module test/Test */
declare class Test {
}
export default Test;
//// [Test.d.ts]
/** @module Test */
declare class Test {
}
export default Test;
//// [index.d.ts]
import Test from './test/Test.js';
export type Options = {
    test?: typeof import("./Test.js").default;
};
/**
 * @typedef {Object} Options
 * @property {typeof import("./Test.js").default} [test]
 */
declare class X extends Test {
    /**
     * @param {Options} options
     */
    constructor(options: Options);
}
export default X;
