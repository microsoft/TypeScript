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
class Base {
    constructor() { }
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


//// [base.d.ts]
export = BaseFactory;
declare function BaseFactory(): Base;
declare namespace BaseFactory {
    export { Base };
}
declare class Base {
}
//// [file.d.ts]
/** @typedef {typeof import('./base')} BaseFactory */
/**
 *
 * @param {InstanceType<BaseFactory["Base"]>} base
 * @returns {InstanceType<BaseFactory["Base"]>}
 */
declare function test(base: InstanceType<BaseFactory["Base"]>): InstanceType<BaseFactory["Base"]>;
type BaseFactory = typeof import("./base");
