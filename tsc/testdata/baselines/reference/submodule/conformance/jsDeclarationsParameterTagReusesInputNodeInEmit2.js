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
export = BaseFactory;
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
export {};


//// [base.d.ts]
export = BaseFactory;
//// [file.d.ts]
export type BaseFactory = typeof import('./base');
