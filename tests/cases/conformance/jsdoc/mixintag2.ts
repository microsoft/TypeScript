// @allowJs: true
// @filename: mixintag2.js
// @out: dummy111.js
/** @module mixy */
'use strict';

/**
 * Object A.
 * @mixin
 */
exports.ObjectA = {
    /** Some method. */
    method: function() {}
};

/**
 * Object B. Mixes Object A.
 * @mixin
 * @mixes module:mixy.ObjectA
 */
exports.ObjectB = {};

/**
 * Object C. Mixes Object B and adds its own method.
 * @mixin
 * @mixes module:mixy.ObjectB
 */
exports.ObjectC = {
    /**
     * Super-sweet method that's named in the comment, making this a virtual comment.
     * @function module:mixy.ObjectC.superSweet
     */
    superSweet: function() {}
};

/**
 * Class that mixes Object A, so it gets {@link module:mixy.ClassA#method}.
 * @class
 * @mixes module:mixy.ObjectA
 */
exports.ClassA = function() {};

/** Do a thing. */
exports.ClassA.prototype.doSomething = function() {};

/**
 * Class that mixes Object C, so it gets {@link module:mixy.ClassB#method} and
 * {@link module:mixy.ClassB#superSweet}.
 * @class
 * @mixes module:mixy.ObjectC
 */
exports.ClassB = function() {};
