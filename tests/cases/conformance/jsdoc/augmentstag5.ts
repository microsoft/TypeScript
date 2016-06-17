// @allowJs: true
// @filename: augmentstag5.js
// @out: dummy20.js
/** @class */
'use strict';

function Base0() {}

Base0.prototype = /** @lends Base0# */ {
    /** Description for {@link Base0#methodOfBaseCommon}. */
    methodOfBaseCommon: function() {},

    /** Description for {@link Base0#methodOfBase0}. */
    methodOfBase0: function() {}
};

/** @class */
function Base1() {}

Base1.prototype = /** @lends Base1# */ {
    /** Description for {@link Base1#methodOfBaseCommon}. */
    methodOfBaseCommon: function() {},

    /** Description for {@link Base1#methodOfBase1}. */
    methodOfBase1: function() {}
};

/**
 * @class
 * @augments Base0
 * @augments Base1
 */
function Class() {}

Class.prototype = Object.create(Base0.prototype);

Object.getOwnPropertyNames(Base1.prototype).forEach(function (prop) {
    Object.defineProperty(Class.prototype, prop, Object.getOwnPropertyDescriptor(Base1.prototype, prop));
});
