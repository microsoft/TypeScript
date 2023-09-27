// @lib: es2017
// @allowJs: true
// @checkJs: true
// @noEmit: true
// from #53967, based on webpack/webpack#16957

// @filename: index.js
const LazySet = require("./LazySet");

/** @type {LazySet} */
const stringSet = undefined;
stringSet.addAll(stringSet);


// @filename: LazySet.js
// Comment out this JSDoc, and note that the errors index.js go away.
/**
 * @typedef {Object} SomeObject
 */
class LazySet {
    /**
     * @param {LazySet} iterable
     */
    addAll(iterable) {}
    [Symbol.iterator]() {}
}

module.exports = LazySet;
