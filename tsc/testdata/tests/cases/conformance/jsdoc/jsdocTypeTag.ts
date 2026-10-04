// @allowJS: true
// @target: esnext
// @suppressOutputPathCheck: true
// @strictNullChecks: true

// @filename: a.js
/** @type {String} */
var S;

/** @type {string} */
var s;

/** @type {Number} */
var N;

/** @type {number} */
var n;

/** @type {BigInt} */
var BI;

/** @type {bigint} */
var bi;

/** @type {Boolean} */
var B;

/** @type {boolean} */
var b;

/** @type {Void} */
var V;

/** @type {void} */
var v;

/** @type {Undefined} */
var U;

/** @type {undefined} */
var u;

/** @type {Null} */
var Nl;

/** @type {null} */
var nl;

/** @type {Array} */
var A;

/** @type {array} */
var a;

/** @type {Promise} */
var P;

/** @type {promise} */
var p;

/** @type {?number} */
var nullable;

/** @type {Object} */
var Obj;

/** @type {object} */
var obj;

/** @type {Function} */
var Func;

/** @type {(s: string) => number} */
var f;

/** @type {new (s: string) => { s: string }} */
var ctor;

// @filename: b.ts
var S: string;
var s: string;
var N: number;
var n: number
var B: boolean;
var b: boolean;
var BI: bigint;
var bi: bigint;
var V :void;
var v: void;
var U: undefined;
var u: undefined;
var Nl: null;
var nl: null;
var A: any[];
var a: any[];
var P: Promise<any>;
var p: Promise<any>;
var nullable: number | null;
var Obj: any;
var obj: any;
var Func: Function;
var f: (s: string) => number;
var ctor: new (s: string) => { s: string };
