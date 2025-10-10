//// [tests/cases/conformance/jsdoc/declarations/jsDeclarationsParameterTagReusesInputNodeInEmit1.ts] ////

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
/** @typedef {import('./base')} BaseFactory */
/**
 * @callback BaseFactoryFactory
 * @param {import('./base')} factory
 */
/** @enum {import('./base')} */
const couldntThinkOfAny = {}

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
/** @typedef {import('./base')} BaseFactory */
/**
 * @callback BaseFactoryFactory
 * @param {import('./base')} factory
 */
/** @enum {import('./base')} */
const couldntThinkOfAny = {};
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
declare class Base {
    constructor();
}
declare function BaseFactory(): Base;
declare namespace BaseFactory {
    var Base: typeof Base;
}
export = BaseFactory;
//// [file.d.ts]
export type BaseFactory = import('./base');
export type BaseFactoryFactory = (factory: import('./base')) ;
