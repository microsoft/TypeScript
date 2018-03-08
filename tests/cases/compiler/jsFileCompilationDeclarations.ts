// @allowJs: true
// @declaration: true
// @emitDeclarationOnly: true
// @target: es6
// @filename: a.js

//
// Variables
//

/**
 * @type {string}
 */
var var1;

/** @type {Window} */
var var2;

/** @type {PromiseLike<string>} */
var var3;

/**
 * The type specifier can specify a union type - e.g. a string or a boolean
 * @type {(string | boolean)}
 */
var var4;

/**
 * Note that parens are options for union types
 * @type {string | boolean}
 */
var var5;


// You can specify an array type (e.g. an array of numbers)
/** @type {number[]} */
var var6;

// An array of numbers (alternate syntax)
/** @type {Array.<number>} */
var var7;

/** @type {Array<number>} */
var var8;


// An object specification may also be used within the braces
// For example, an object used as a boolean map
/** @type {{[a: string]: boolean}} */
var var9;

//
// Typedefs
//

// "@typedef" maybe used to define complex types
/**
 * @typedef {Object} SpecialType - creates a new type named 'SpecialType'
 * @property {string} prop1 - a string property of SpecialType
 * @property {number} prop2 - a number property of SpecialType
 * @property {number=} prop3 - an optional number property of SpecialType
 * @prop {number} [prop4] - an optional number property of SpecialType
 * @prop {number} [prop5=42] - an optional number property of SpecialType with default value
 */
/** @type {SpecialType} */
var specialTypeObject;

// You can use both 'object' and 'Object'
/**
 * @typedef {object} SpecialType1 - creates a new type named 'SpecialType'
 * @property {string} prop1 - a string property of SpecialType
 * @property {number} prop2 - a number property of SpecialType
 * @property {number=} prop3 - an optional number property of SpecialType
 */
/** @type {SpecialType1} */
var specialTypeObject1;


//
// Functions
//

// Likewise, for the return type of a function
/**
 * @return {PromiseLike<string>}
 */
function fn1() { }

/**
 * @returns {{a: string, b: number}} - May use '@returns' as well as '@return'
 */
function fn2() { }


// Parameters may be declared in a variety of syntactic forms
/**
 * @param p0 {string} - A string param declared using TS-style
 * @param {string}  p1 - A string param.
 * @param {string=} p2 - An optional param
 * @param {string} [p3] - Another optional param.
 * @param {string} [p4="test"] - An optional param with a default value
 * @return {string} This is the result
 */
function fn3(p0, p1, p2, p3, p4) {
  // TODO
}


// Generic types may also be used
/**
 * @template T
 * @param {T} p1 - A generic parameter that flows through to the return type
 * @return {T}
 */
function fn4(p1) { }

// Define function type
/** @type {function(string, boolean): number} */
var fn5;

// Both "fn6" and "fn7" have same type of Function type.
/** @type {function} */
var fn6;

/** @type {Function} */
var fn7;

/**
 * @param {*} p1 - Param can be 'any' type
 * @param {?} p2 - Param is of unknown type (same as 'any')
 */
function fn8(p1, p2) { }

var someObj = {
  /**
   * @param {string} param1 - Docs on property assignments work
   */
  x: function (param1) { }
};

/**
 * As do docs on variable assignments
 * @return {Window}
 */
let someFunc = function () { };

var Foo = function() {}

/**
 * And class methods
 * @param {string} greeting The greeting to use
 */
Foo.prototype.sayHi = (greeting) => console.log("Hi!");

/**
 * And arrow functions expressions
 * @param {number} x - A multiplier
 */
let myArrow = x => x * x;


/**
 * A parameter can be a class constructor.
 *
 * @param {{new(...args: any[]): object}} C - The class to register
 */
function registerClass(C) { }

/**
 * ES6 Classes
 */
class IconComponent {
  /** @readonly */
  static observedAttributes() {
    return ['icon']
  }

  constructor() {}

  /**
   * @param name {string}
   * @param oldValue {null | string}
   * @param newValue {null | string}
   */
  attributeChangedCallback(name, oldValue, newValue) {}

  /** @private */
  _render() {}
}
