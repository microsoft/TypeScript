//// [a.js]
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




//// [a.d.ts]
/**
 * @type {string}
 */
declare var var1: string;
/** @type {Window} */
declare var var2: any;
/** @type {PromiseLike<string>} */
declare var var3: PromiseLike<string>;
/**
 * The type specifier can specify a union type - e.g. a string or a boolean
 * @type {(string | boolean)}
 */
declare var var4: string | boolean;
/**
 * Note that parens are options for union types
 * @type {string | boolean}
 */
declare var var5: string | boolean;
/** @type {number[]} */
declare var var6: number[];
/** @type {Array.<number>} */
declare var var7: number[];
/** @type {Array<number>} */
declare var var8: number[];
/** @type {{[a: string]: boolean}} */
declare var var9: {
    [a: string]: boolean;
};
/**
 * @typedef {Object} SpecialType - creates a new type named 'SpecialType'
 * @property {string} prop1 - a string property of SpecialType
 * @property {number} prop2 - a number property of SpecialType
 * @property {number=} prop3 - an optional number property of SpecialType
 * @prop {number} [prop4] - an optional number property of SpecialType
 * @prop {number} [prop5=42] - an optional number property of SpecialType with default value
 */
/** @type {SpecialType} */
declare var specialTypeObject: {
    prop1: string;
    prop2: number;
    prop3?: number;
    prop4?: number;
    prop5?: number;
};
/**
 * @typedef {object} SpecialType1 - creates a new type named 'SpecialType'
 * @property {string} prop1 - a string property of SpecialType
 * @property {number} prop2 - a number property of SpecialType
 * @property {number=} prop3 - an optional number property of SpecialType
 */
/** @type {SpecialType1} */
declare var specialTypeObject1: {
    prop1: string;
    prop2: number;
    prop3?: number;
};
/**
 * @return {PromiseLike<string>}
 */
declare function fn1(): PromiseLike<string>;
/**
 * @returns {{a: string, b: number}} - May use '@returns' as well as '@return'
 */
declare function fn2(): {
    a: string;
    b: number;
};
/**
 * @param p0 {string} - A string param declared using TS-style
 * @param {string}  p1 - A string param.
 * @param {string=} p2 - An optional param
 * @param {string} [p3] - Another optional param.
 * @param {string} [p4="test"] - An optional param with a default value
 * @return {string} This is the result
 */
declare function fn3(p0: string, p1: string, p2?: string, p3?: string, p4?: string): string;
/**
 * @template T
 * @param {T} p1 - A generic parameter that flows through to the return type
 * @return {T}
 */
declare function fn4(p1: T): T;
/** @type {function(string, boolean): number} */
declare var fn5: (arg0: string, arg1: boolean) => number;
/** @type {function} */
declare var fn6: Function;
/** @type {Function} */
declare var fn7: Function;
/**
 * @param {*} p1 - Param can be 'any' type
 * @param {?} p2 - Param is of unknown type (same as 'any')
 */
declare function fn8(p1: any, p2: any): void;
declare var someObj: {
    [x: string]: any;
    x: (param1: string) => void;
};
/**
 * As do docs on variable assignments
 * @return {Window}
 */
declare let someFunc: () => any;
declare var Foo: () => void;
/**
 * And arrow functions expressions
 * @param {number} x - A multiplier
 */
declare let myArrow: (x: number) => number;
/**
 * A parameter can be a class constructor.
 *
 * @param {{new(...args: any[]): object}} C - The class to register
 */
declare function registerClass(C: new (...args: any[]) => any): void;
/**
 * ES6 Classes
 */
declare class IconComponent {
    /** @readonly */
    static observedAttributes(): string[];
    constructor();
    /**
     * @param name {string}
     * @param oldValue {null | string}
     * @param newValue {null | string}
     */
    attributeChangedCallback(name: string, oldValue: string, newValue: string): void;
    /** @private */
    _render(): void;
}
