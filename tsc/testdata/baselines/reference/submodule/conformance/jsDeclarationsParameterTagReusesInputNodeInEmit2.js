//// [tests/cases/conformance/jsdoc/declarations/jsDeclarationsParameterTagReusesInputNodeInEmit2.ts] ////

//// [base.js]
class Base {
    constructor() {}
}

const BaseFactory = () => {
    return new Base();
};

BaseFactory.Base = Base;

module.exports = BaseFactory;

//// [file.js]
/** @typedef {typeof import('./base')} BaseFactory */

/**
 *
 * @param {InstanceType<BaseFactory["Base"]>} base
 * @returns {InstanceType<BaseFactory["Base"]>}
 */
const test = (base) => {
    return base;
};


//// [base.js]
"use strict";
class Base {
    constructor() { }
}
const BaseFactory = () => {
    return new Base();
};
BaseFactory.Base = Base;
module.exports = BaseFactory;
//// [file.js]
"use strict";
/** @typedef {typeof import('./base')} BaseFactory */
/**
 *
 * @param {InstanceType<BaseFactory["Base"]>} base
 * @returns {InstanceType<BaseFactory["Base"]>}
 */
const test = (base) => {
    return base;
};


//// [base.d.ts]
declare class Base {
    constructor();
}
declare function BaseFactory(): Base;
declare namespace BaseFactory {
    var Base: typeof Base;
}
export = BaseFactory;
//// [file.d.ts]
/** @typedef {typeof import('./base')} BaseFactory */
type BaseFactory = typeof import('./base');
/**
 *
 * @param {InstanceType<BaseFactory["Base"]>} base
 * @returns {InstanceType<BaseFactory["Base"]>}
 */
declare const test: (base: InstanceType<BaseFactory["Base"]>) => InstanceType<BaseFactory["Base"]>;


//// [DtsFileErrors]


out/base.d.ts(6,9): error TS2502: 'Base' is referenced directly or indirectly in its own type annotation.


==== out/base.d.ts (1 errors) ====
    declare class Base {
        constructor();
    }
    declare function BaseFactory(): Base;
    declare namespace BaseFactory {
        var Base: typeof Base;
            ~~~~
!!! error TS2502: 'Base' is referenced directly or indirectly in its own type annotation.
    }
    export = BaseFactory;
    
==== out/file.d.ts (0 errors) ====
    /** @typedef {typeof import('./base')} BaseFactory */
    type BaseFactory = typeof import('./base');
    /**
     *
     * @param {InstanceType<BaseFactory["Base"]>} base
     * @returns {InstanceType<BaseFactory["Base"]>}
     */
    declare const test: (base: InstanceType<BaseFactory["Base"]>) => InstanceType<BaseFactory["Base"]>;
    