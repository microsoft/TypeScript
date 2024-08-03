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
export default Test;
/** @module test/Test */
declare class Test {
}
//// [Test.d.ts]
export default Test;
/** @module Test */
declare class Test {
}
//// [index.d.ts]
export default X;
export type Options = {
    test?: typeof import("Test").default | undefined;
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
    test: import("Test").default | undefined;
}
import Test from './test/Test.js';


//// [DtsFileErrors]


index.d.ts(3,26): error TS2307: Cannot find module 'Test' or its corresponding type declarations.
index.d.ts(14,18): error TS2307: Cannot find module 'Test' or its corresponding type declarations.


==== test/Test.d.ts (0 errors) ====
    export default Test;
    /** @module test/Test */
    declare class Test {
    }
    
==== Test.d.ts (0 errors) ====
    export default Test;
    /** @module Test */
    declare class Test {
    }
    
==== index.d.ts (2 errors) ====
    export default X;
    export type Options = {
        test?: typeof import("Test").default | undefined;
                             ~~~~~~
!!! error TS2307: Cannot find module 'Test' or its corresponding type declarations.
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
        test: import("Test").default | undefined;
                     ~~~~~~
!!! error TS2307: Cannot find module 'Test' or its corresponding type declarations.
    }
    import Test from './test/Test.js';
    