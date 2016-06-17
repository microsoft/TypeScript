// @allowJs: true
// @filename: interface-implements.js
// @out: dummy87.js
'use strict';

/**
 * @interface
 */
function ITester() {}

/**
 * @type {string}
 */
ITester.prototype.hello = '123';

/**
 * @enum
 */
ITester.type = {
    KEYDOWN: 9,
    KEYUP: 11
};

/**
 * before each method
 */
ITester.prototype.beforeEach = function() {};

/**
 * it method.
 */
ITester.prototype.it = function() {};

/**
 * @constructor
 * @implements {ITester}
 */
function MyTester() {}

/** @type {string} */
MyTester.prototype.hello = '234';

/** @enum */
MyTester.type = {
    /** keyboard up */
    KEYDOWN: 9,
    KEYUP: 11,
    KEYLEFT: 10
};
/**
 * my tester's beforeEach method.
 */
MyTester.prototype.beforeEach = function() {};
MyTester.prototype.it = function() {};

/**
 * @interface
 */
function IWorker() {}
/** Interface for doing some work. */
IWorker.prototype.work = function() {};

/**
 * @constructor
 * @implements {IWorker}
 */
function MyWorker() {}
/** Do some work. */
MyWorker.prototype.work = function() {};
MyWorker.prototype.process = function() {};

/**
 * @constructor
 * @implements {IWorker}
 */
function MyIncompleteWorker() {}
