// @allowJs: true
// @checkJs: true
// @target: es6
// @outDir: ./out
// @declaration: true
// @filename: base.js
class Base {
    constructor() {}
}

const BaseFactory = () => {
    return new Base();
};

BaseFactory.Base = Base;

module.exports = BaseFactory;

// @filename: file.js
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
