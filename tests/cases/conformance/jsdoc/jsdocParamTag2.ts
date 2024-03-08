// @allowJS: true
// @checkJS: true
// @noEmit: true
// @Filename: 0.js

// Object literal syntax
/**
 * @param {{a: string, b: string}} obj
 * @param {string} x
 */
function good1({a, b}, x) {}
/**
 * @param {{a: string, b: string}} obj
 * @param {{c: number, d: number}} OBJECTION
 */
function good2({a, b}, {c, d}) {}
/**
 * @param {number} x
 * @param {{a: string, b: string}} obj
 * @param {string} y
 */
function good3(x, {a, b}, y) {}
/**
 * @param {{a: string, b: string}} obj
 */
function good4({a, b}) {}

// nested object syntax
/**
 * @param {Object} obj
 * @param {string} obj.a - this is like the saddest way to specify a type
 * @param {string} obj.b - but it sure does allow a lot of documentation
 * @param {string} x
 */
function good5({a, b}, x) {}
/**
 * @param {Object} obj
 * @param {string} obj.a
 * @param {string} obj.b - but it sure does allow a lot of documentation
 * @param {Object} OBJECTION - documentation here too
 * @param {string} OBJECTION.c
 * @param {string} OBJECTION.d - meh
 */
function good6({a, b}, {c, d}) {}
/**
 * @param {number} x
 * @param {Object} obj
 * @param {string} obj.a
 * @param {string} obj.b
 * @param {string} y
 */
function good7(x, {a, b}, y) {}
/**
 * @param {Object} obj
 * @param {string} obj.a
 * @param {string} obj.b
 */
function good8({a, b}) {}

/**
 * @param {{ a: string }} argument
 */
function good9({ a }) {
    console.log(arguments, a);
}

/**
 * @param {object} obj - this type gets ignored
 * @param {string} obj.a
 * @param {string} obj.b - and x's type gets used for both parameters
 * @param {string} x
 */
function bad1(x, {a, b}) {}
/**
 * @param {string} y - here, y's type gets ignored but obj's is fine
 * @param {{a: string, b: string}} obj
 */
function bad2(x, {a, b}) {}
