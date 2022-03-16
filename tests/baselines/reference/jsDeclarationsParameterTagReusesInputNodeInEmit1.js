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


//// [base.d.ts]
export = BaseFactory;
declare function BaseFactory(): Base;
declare namespace BaseFactory {
    export { Base };
}
declare class Base {
}
